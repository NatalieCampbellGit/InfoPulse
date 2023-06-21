// Utility function to check if the user is logged in
// If the user is not logged in, redirect the user to the login page

// ! CHANGE THIS TO FALSE BEFORE DEPLOYING
const isDebug = true

const withAuth = (req, res, next) => {
  if (isDebug) {
    next()
    return
  }

  if (!req.session.loggedIn) {
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = withAuth
