// Direct API Routes to the proper files
const router = require("express").Router();

const userRoutes = require("./user-routes");
const imageRoutes = require("./image-routes");
const markdownRoutes = require("./markdown-routes");
const templateRoutes = require("./template-routes");
const factsheetRoutes = require("./factsheet-routes");
const adminloginRoutes = require("./admin-routes");
const categoriesRoutes = require("./category-routes");

router.use("/users", userRoutes);
router.use("/images", imageRoutes);
router.use("/markdown", markdownRoutes);
router.use("/templates", templateRoutes);
router.use("/factsheets", factsheetRoutes);
router.use("/admin", adminloginRoutes);
router.use("/categories", categoriesRoutes);

// // add default 404 message> {
// router.use((req, res) => {
//   res.status(404).json({ message: "No such API route exists" });
// });

module.exports = router;
