// Direct API Routes to the proper files
const router = require('express').Router()

const userRoutes = require('./user-routes')
const imageRoutes = require('./image-routes')
const rmtestRoutes = require('./rm-test-routes')

router.use('/users', userRoutes)
router.use('/images', imageRoutes)
router.use('/rmtest', rmtestRoutes)

module.exports = router
