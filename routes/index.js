'use strict'

const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const categoryRoutes = require('./categoryRoutes')
const homeRoutes = require('./homeRoutes')
const errorRoutes = require('./errorRoutes')

router.use('/todos', todoRoutes)
router.use('/categories', categoryRoutes)
router.use('/', homeRoutes)
router.use('/', errorRoutes)

module.exports = router
