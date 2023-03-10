'use strict'

const router = require('express').Router()
const homeController = require('../controllers/homeController')

router.get('/', homeController.showIndex)

module.exports = router
