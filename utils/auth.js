// Utility function to check if the user is logged in
// If the user is not logged in, redirect the user to the login page

// ! CHANGE THIS TO FALSE BEFORE DEPLOYING
const isDebug = true;

// withAuth middleware doesn't care if the user has a role of 'user' or 'admin'
const withAuth = (req, res, next) => {
  if (isDebug) {
    req.session.loggedIn = true;
    next();
    return;
  }
  if (!req.session.loggedIn) {
    res.redirect("/");
  } else {
    next();
  }
};

// withAdminAuth middleware only allows users with a role of 'admin' to access the route
const withAdminAuth = (req, res, next) => {
  // ! TODO remove all the debug stuff
  // if (isDebug) {
  //   // req.session.userRole = "admin";
  //   // req.session.loggedIn = true;
  //   // req.session.user_id = 1;
  //   next();
  //   return;
  // }
  if (!req.session.userRole === "admin") {
    res.redirect("/adminlogin");
  } else {
    if (!req.session.loggedIn) {
      res.redirect("/adminlogin");
    } else {
      next();
    }
  }
};
// withUserAuth middleware only allows users with a role of 'user' to access the route
const withUserAuth = (req, res, next) => {
  if (isDebug) {
    req.session.user_id = 1;
    req.session.loggedIn = true;
    next();
    return;
  }
  if (!req.session.userRole === "user") {
    res.redirect("/login");
  } else {
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  }
};

module.exports = { withAuth, withAdminAuth, withUserAuth };
