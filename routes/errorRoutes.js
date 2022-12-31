'use strict'

const router = require('express').Router()
const errorController = require('../controllers/errorController')

router.get('/error', errorController.clientError, errorController.errorView)
router.use(errorController.pageNotFoundError, errorController.errorView)

module.exports = router
