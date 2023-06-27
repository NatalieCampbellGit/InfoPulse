// The home routes handle the homepage, user-login, admin-login, logout, about and sign-up pages

const router = require("express").Router();
const { withAuth, withAdminAuth, withUserAuth } = require("../utils/auth");
const { getAdministratorDashboardData } = require("../utils/models-utils");
const { getUserDashboardData } = require("../utils/models-utils");
// Display the homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
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
    res.redirect("/");
    return;
  }
  // otherwise, render the login template
  res.render("login", {
    // send data to the template
  });
});

// Log the user out
router.get("/logout", withAuth, (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err, message: "Error logging out" });
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect("/");
  }
});

// display the admin login page
router.get("/admin-login", (req, res) =>{

  if(req.session.loggedIn){
    res.redirect('/')
  } else {
    res.render("admin-login")
    
  }

})

// Display the signup page
router.get("/signup", (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
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
      // send to 404 route
      res
        .status(404)
        .render("error-404", { message: "Administrator not found" });
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
    console.log;
    // configure the adminDashboardData object to display the correct buttons
    adminDashboardData.selectOnly = false;
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
    const userDashboardData = await getUserDashboardData(
      user_id,
      0 // 0 means general view on dashboard
    );
    if (!userDashboardData) {
      // send to 404 route
      res.status(404).render("error-404", {
        message: "Could not retrieve the User Dashboard data",
        previousRoute: "home",
      });
      return;
    }
    console.log;
    

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
