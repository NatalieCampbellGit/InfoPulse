// Direct API Routes to the proper files
const router = require("express").Router();

const userRoutes = require("./user-routes");
const imageRoutes = require("./image-routes");
const markdownRoutes = require("./markdown-routes");
const templateRoutes = require("./template-routes");
const factsheetRoutes = require("./factsheet-routes");
const adminRoutes = require("./admin-routes");
const categoriesRoutes = require("./category-routes");
const userCommentRoutes = require("./user-comment-routes");

router.use("/users", userRoutes);
router.use("/images", imageRoutes);
router.use("/markdown", markdownRoutes);
router.use("/templates", templateRoutes);
router.use("/factsheets", factsheetRoutes);
router.use("/admin", adminRoutes);
router.use("/categories", categoriesRoutes);
router.use("/comments", userCommentRoutes);

module.exports = router;
