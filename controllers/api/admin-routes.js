// handles the admin login page
const { sequelize, Op } = require("sequelize");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const { use } = require("../home-routes");
const router = require("express").Router();
const Administrator = require("../../models/Administrator");

// Login
router.post('/login', async (req, res) => {
  try {
    const email = req.body.username.toLowerCase().trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    

    const userData = await Administrator.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email },
        ],
      }
    })
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' })
      return
    }
    const validPassword = await userData.checkPassword(password)
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
      req.session.userRole = "admin"
      res
        .status(200)
        .json( { message: "Successfully logged in"})
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err, message: 'Error logging in' })
  }
})

module.exports = router;