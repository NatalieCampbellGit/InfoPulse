/* eslint-disable camelcase */
// The home routes handle the homepage, user-login, admin-login, logout, about and sign-up pages
const router = require("express").Router();
const { withAuth, withUserAuth, withAdminAuth } = require("../utils/auth");
const {
  getAdministratorDashboardData,
  getUserDashboardData,
  getAllCategories,
} = require("../utils/model-utils");

// Display the login page
router.get("/login-main", (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    if (req.session.userRole === "user") {
      res.redirect("/userdashboard");
    } else if (req.session.userRole === "admin") {
      res.redirect("/admin");
    }
    return;
  } // otherwise, render the login template
  res.render("login-main", {
    // send data to the template
    currentPage: "login-main",
    isUser: req.session.userRole === "user",
    loggedIn: req.session.loggedIn,
    pageTitle: "Client Login",
  });
});

// Display the admin-login page, or go to the admin dashboard if the administrator is already logged in
router.get("/login-admin", async (req, res) => {
  // if the user is already logged in, redirect to the admin dashboard
  if (req.session.loggedIn && req.session.userRole === "admin") {
    const administrator_id = req.session.user_id;
    if (!administrator_id || administrator_id === "" || administrator_id < 1) {
      res.render("admin-login", {
        currentPage: "admin-login",
        loggedIn: req.session.loggedIn,
        isUser: req.session.userRole === "user",
        pageTitle: "Administrator Login",
      });
      return;
    }
    const adminDashboardData = await getAdministratorDashboardData(
      administrator_id
    );
    if (!adminDashboardData) {
      res.render("admin-login", {
        currentPage: "admin-login",
        loggedIn: req.session.loggedIn,
        isUser: req.session.userRole === "user",
        pageTitle: "Administrator Login",
      });
      return;
    }
    res.redirect("/admin");
    return;
  }
  // otherwise, render the login template
  res.render("admin-login", {
    currentPage: "admin-login",
    loggedIn: req.session.loggedIn,
    isUser: req.session.userRole === "user",
    pageTitle: "Administrator Login",
    // send data to the template
  });
});

// Log the user out (works for user and admin)
router.get("/logout", withAuth, (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Error logging out" });
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect("homepage");
  }
});

// Display the signup page
router.get("/signup", (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    if (req.session.userRole === "user") {
      res.redirect("/userdashboard");
    } else {
      res.redirect("/admin");
    }
    return;
  }
  // otherwise, render the signup template
  res.render("signup", {
    // send data to the template
    currentPage: "signup",
    loggedIn: req.session.loggedIn,
    isUser: req.session.userRole === "user",
    pageTitle: "Client Sign Up",
  });
});

// display the Administrator Dashboard with particular user
router.get("/admin-dashboard/:id", withAdminAuth, async (req, res) => {
  // get the user id from the request
  let userId = req.params.id;
  if (!userId || userId === "" || userId < 1) {
    userId = 0;
  }
  userId = parseInt(userId);

  try {
    // information that this route needs:
    // all categories
    // all templates
    // administrator's info

    // guaranteed to be an administrator because of the withAdminAuth middleware
    const administrator_id = req.session.user_id;
    if (!administrator_id || administrator_id === "" || administrator_id < 1) {
      // send to admin login page
      res.redirect("/login-admin");
      return;
    }

    // get the administrator dashboard's info using a util function
    const adminDashboardData = await getAdministratorDashboardData(
      administrator_id,
      0 // 0 means general view on dashboard
    );
    if (!adminDashboardData) {
      // send to 404 route
      res.status(404).json({
        message: "Could not retrieve the Administrator Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    adminDashboardData.userId = userId;
    if (userId > 0) {
      adminDashboardData.hasUser = true;
    } else {
      adminDashboardData.hasUser = false;
    }
    adminDashboardData.pageTitle = "Administrator Dashboard";
    adminDashboardData.loggedIn = req.session.loggedIn;
    adminDashboardData.isUser = req.session.userRole === "user";
    // configure the adminDashboardData object to display the correct buttons
    res.render("admin-dashboard", adminDashboardData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error loading the Administrator Dashboard" });
  }
});

// display the Administrator Dashboard without specific user
router.get("/admin", withAdminAuth, async (req, res) => {
  try {
    // information that this route needs:
    // all categories
    // all templates
    // administrator's info

    // guaranteed to be an administrator because of the withAdminAuth middleware
    const administrator_id = req.session.user_id;
    if (!administrator_id || administrator_id === "" || administrator_id < 1) {
      // send to admin login page
      res.redirect("/login-admin");
      return;
    }

    // get the administrator dashboard's info using a util function
    const adminDashboardData = await getAdministratorDashboardData(
      administrator_id,
      0 // 0 means general view on dashboard
    );
    if (!adminDashboardData) {
      // send to 404 route
      res.status(404).json({
        message: "Could not retrieve the Administrator Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    adminDashboardData.userId = 0;
    adminDashboardData.hasUser = false;
    adminDashboardData.pageTitle = "Administrator Dashboard";
    adminDashboardData.loggedIn = req.session.loggedIn;
    adminDashboardData.isUser = req.session.userRole === "user";

    // configure the adminDashboardData object to display the correct buttons
    res.render("admin-dashboard", adminDashboardData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error loading the Administrator Dashboard" });
  }
});

// go to the categories admin page
router.get("/categories", withAdminAuth, async (req, res) => {
  try {
    // information that this route needs:
    // all categories
    const categories = await getAllCategories();
    console.log(categories);
    res.render("category-admin", {
      categories,
      loggedIn: req.session.loggedIn,
      isUser: req.session.userRole === "user",
      pageTitle: "Categories Administration",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error loading the categories admin page" });
  }
});

// Display the about page
// ! TO DO
router.get("/about", (req, res) => {
  try {
    res.render("about", {
      loggedIn: req.session.loggedIn,
      isUser: req.session.userRole === "user",
      pageTitle: "About InfoPulse",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Server Error displaying about page" });
  }
});

router.get("/privacy-policy/", (req, res) => {
  try {
    res.render("privacy-policy", {
      loggedIn: req.session.loggedIn,
      isUser: req.session.userRole === "user",
      pageTitle: "Privacy Policy",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Server Error displaying privacy policy page" });
  }
});

// display user dashboard
router.get("/userdashboard", withUserAuth, async (req, res) => {
  try {
    // information that this route needs:
    // all factsheets for the user
    // logged in info
    // user info
    // administrator's info

    // guaranteed to be an user because of the withUserAuth middleware
    const user_id = req.session.user_id;
    if (!user_id || user_id === "" || user_id < 1) {
      // send to 404 route
      res.status(404).json({ message: "User not found" });
      return;
    }

    // get the user dashboard's info using a util function
    const userDashboardData = await getUserDashboardData(user_id);

    if (!userDashboardData) {
      // send to 404 route
      res.status(404).json({
        message: "Could not retrieve the User Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    userDashboardData.loggedIn = req.session.loggedIn;
    userDashboardData.isUser = req.session.userRole === "user";
    console.log(userDashboardData);

    userDashboardData.pageTitle =
      userDashboardData.username + " - Your Dashboard";

    res.render("user-dashboard", userDashboardData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: "Error loading the User Dashboard" });
  }
});

// Display the homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      // send the session variable (loggedIn) to the template
      loggedIn: req.session.loggedIn,
      isUser: req.session.userRole === "user",
      pageTitle: "InfoPulse Home",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error getting blog posts" });
  }
});

module.exports = router;
