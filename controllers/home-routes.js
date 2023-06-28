// The home routes handle the homepage, user-login, admin-login, logout, about and sign-up pages

const router = require("express").Router();
const { withAuth, withUserAuth, withAdminAuth } = require("../utils/auth");
const { getAdministratorDashboardData, getUserById } = require("../utils/model-utils");

// Display the homepage
router.get("/", async (req, res) => {
  try {
    res.render('../views/homepage', { title: "homepage" }, {
      // send the session variable (loggedIn) to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Error getting blog posts" });
  }
});

// Display the login page
router.get("/login", (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('../views/homepage', { title: "homepage"} );
    return;
  }  // otherwise, render the login template
  res.render("login", {
    // send data to the template
  });
});

// Display the admin-login page, or go to the admin dashboard if the administrator is already logged in
router.get("/adminlogin", async (req, res) => {
  // if the user is already logged in, redirect to the admin dashboard
  if (req.session.loggedIn && req.session.userRole==='admin') {
    const administrator_id = req.session.user_id;
    if (!administrator_id || administrator_id === "" || administrator_id < 1) {
      res.render("admin-login");
      return
    }
    const adminDashboardData = await getAdministratorDashboardData(administrator_id);
    if (!adminDashboardData) {
      res.render("admin-login");
      return
    }
    res.redirect("/admin");
    return;
  }
  // otherwise, render the login template
  res.render("admin-login", {
    // send data to the template
  });
});

// Log the user out
router.get("/logout", withAuth, (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect('../views/homepage', { title: "homepage"} );
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err, message: "Error logging out" });
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect('../views/homepage', { title: "homepage"} );
  }
});

// Display the signup page
router.get("/signup", (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('../views/homepage', { title: "homepage"} );;
    return;
  }
  // otherwise, render the signup template
  res.render("signup", {
    // send data to the template
  });
});

// display the Administrator Dashboard
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
      res.redirect("/adminlogin");
      return;
    }

    // get the administrator dashboard's info using a util function
    const adminDashboardData = await getAdministratorDashboardData(
      administrator_id,
      0 // 0 means general view on dashboard
    );
    if (!adminDashboardData) {
      // send to 404 route
      res.status(404).render("error-404", {
        message: "Could not retrieve the Administrator Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    // configure the adminDashboardData object to display the correct buttons
    res.render("admin-dashboard", adminDashboardData);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: "Error loading the Administrator Dashboard" });
  }
});

// Display the aboutpage
// ! TO DO 
router.get('/about', (req, res) => {
  try{  

    res
    .render("about")
    .status(200)



  }catch(err){
    res
      .status(500)
      .json({err, message: "Server Error displaying about page"})
  }
});


// display user dashboard
router.get("/user", withUserAuth, async (req, res) => {
  try {
    // information that this route needs:
    // all categories
    // all templates
    // user's info

    // guaranteed to be an user because of the withUserAuth middleware
    const user_id = req.session.user_id;
    if (!user_id || user_id === "" || user_id< 1) {
      // send to 404 route
      res
        .status(404)
        .render("error-404", { message: "User not found" });
      return;
    }

    // get the user dashboard's info using a util function
    const userDashboardData = await getUserById(user_id)
    if (!userDashboardData) {
      // send to 404 route
      res.status(404).render("error-404", {
        message: "Could not retrieve the User Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    console.log;

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
      res.status(404).render("error-404", { message: "User not found" });
      return;
    }

    // get the user dashboard's info using a util function
    const userDashboardData = await getUserById(user_id);
    console.log(userDashboardData);
    if (!userDashboardData) {
      // send to 404 route
      res.status(404).render("error-404", {
        message: "Could not retrieve the User Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    // console.log(userDashboardData)

    // configure the userDashboardData object to display the correct buttons
    res.render("user-dashboard", userDashboardData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Error loading the User Dashboard" });
  }
});

    res.render("user-dashboard", userDashboardData);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: "Error loading the User Dashboard" });
  }
});
// ! DELETE THIS ROUTE BEFORE DEPLOYING
// Display the test page
router.get("/rm-test", (req, res) => {
  res.render("rm-test", {
    // send data to the template
  });
});

module.exports = router;
