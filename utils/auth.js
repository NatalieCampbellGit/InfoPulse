// Utility function to check if the user is logged in
// If the user is not logged in, redirect the user to the login page
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = withAuth
