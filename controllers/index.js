const router = require('express').Router()

const homeRoutes = require('./home-routes.js')
const apiRoutes = require('./api')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)
router.use('/search', apiRoutes)

// add default 404 route for completeness
router.use((req, res) => {
  res.status(404).render('error-404', {})
})

module.exports = router


