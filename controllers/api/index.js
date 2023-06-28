// Direct API Routes to the proper files
const router = require("express").Router();

const userRoutes = require("./user-routes");
const imageRoutes = require("./image-routes");
const rmtestRoutes = require("./rm-test-routes");
const markdownRoutes = require("./markdown-routes");
const rmTemplateRoutes = require("./rm-template-routes");
const rmUserRoutes = require("./rm-user-routes");
const rmFactsheetRoutes = require("./rm-factsheet-routes");
const adminloginRoutes = require('./admin-routes');

router.use("/users", userRoutes);
router.use("/images", imageRoutes);
router.use("/markdown", markdownRoutes);
router.use("/rmtest", rmtestRoutes);
router.use("/rmtemplate", rmTemplateRoutes);
router.use("/rmusers", rmUserRoutes);
router.use("/rmfactsheets", rmFactsheetRoutes);
router.use("/admin", adminloginRoutes);

module.exports = router;
