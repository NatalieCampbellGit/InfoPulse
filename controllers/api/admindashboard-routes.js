// handles the routes for the admin dashboard
const { sequelize, Op } = require("sequelize");
const Template = require("../../models/Template");
const Category = require("../../models/Category");
const { withAuth, withAdminAuth } = require("../../utils/auth");
const router = require("express").Router();
const { formatTemplateListItems } = require("../../utils/html-utils");
const {
  getAdministratorDashboardData,
  getTemplateById,
} = require("../../utils/models-utils");

// redirect to homepage
router.get('/', withAdminAuth, (req, res) => {
    try{
        res.render('/home')



    }catch(err){
        res.status(500)
    }

})