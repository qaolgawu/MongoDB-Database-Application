const router = require('express').Router()
const userRouter = require('./User')
const pageRouter = require('./pages')

router.use('/user', userRouter)
router.use('/page', pageRouter)

module.exports = router
