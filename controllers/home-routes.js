// The home routes handle the homepage, login, logout, and signup pages
const router = require('express').Router()
const withAuth = require('../utils/auth')

// Display the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      // send the session variable (loggedIn) to the template
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error getting blog posts' })
  }
})

// Display the login page
router.get('/login', (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  // otherwise, render the login template
  res.render('login', {
    // send data to the template
  })
})

// Log the user out
router.get('/logout', withAuth, (req, res) => {
  // if the user is logged in, destroy the session and redirect to the homepage
  if (req.session.loggedIn) {
    try {
      req.session.destroy(() => {
        res.redirect('/')
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ err, message: 'Error logging out' })
    }
  } else {
    // otherwise, redirect to the homepage
    res.redirect('/')
  }
})

// Display the signup page
router.get('/signup', (req, res) => {
  // if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  // otherwise, render the signup template
  res.render('signup', {
    // send data to the template
  })
})

// ! DELETE THIS ROUTE BEFORE DEPLOYING
// Display the test page
router.get('/rm-test', (req, res) => {
  res.render('rm-test', {
    // send data to the template
  })
})

module.exports = router
