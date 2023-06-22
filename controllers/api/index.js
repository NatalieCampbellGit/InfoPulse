// Direct API Routes to the proper files
const router = require('express').Router()

const userRoutes = require('./user-routes')
const imageRoutes = require('./image-routes')
const rmtestRoutes = require('./rm-test-routes')
const markdownRoutes = require('./markdown-routes')

router.use('/users', userRoutes)
router.use('/images', imageRoutes)
router.use('/markdown', markdownRoutes)
router.use('/rmtest', rmtestRoutes)

module.exports = router
