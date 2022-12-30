'use strict'

const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')

router.use('/todos', todoRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router
