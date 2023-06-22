// Direct API Routes to the proper files
// TODO add all model routes if there are more than just user
const router = require("express").Router();
const userRoutes = require("./user-routes");
//const Routes = require("./xxx-routes")'

router.use("/users", userRoutes);
// router.use('/xxx', xxx-routes);

module.exports = router;
