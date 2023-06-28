// handles the admin login page
const { sequelize, Op } = require("sequelize");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const router = require("express").Router();


router.get('/admin-login', (req, res, async) => {
    
})



// redirect to the home page
router.get('/home', (req, res) => {
    res.redirect('/');
  });

