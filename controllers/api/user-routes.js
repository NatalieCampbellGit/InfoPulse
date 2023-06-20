// Purpose: user routes
const router = require('express').Router()
const { User } = require('../../models')

// CREATE new user
router.post('/', async (req, res) => {
// check that the user does not already exist
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
        // ! etcetera
      }
    })
    if (dbUserData) {
      // already exists. Let the user know
      res
        .status(400)
        .json({ message: 'This username is already taken.' })
      return
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error checking for existing user' })
  }
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password
      // ! etcetera
    })
    // save session
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      // ! etcetera
      res.status(200).json(dbUserData)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error creating new user' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
        // ! etcetera
      }
    })
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    const validPassword = await userData.checkPassword(req.body.password)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    // save session
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user_id = userData.id
      req.session.username = userData.username
      // ! etcetera
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error logging in' })
  }
})

module.exports = router
