'use strict'

const models = require('../models')

module.exports = {
  show: (req, res, next) => {

  },
  showView: (req, res) => {

  },
  edit: (req, res, next) => {

  },
  editView: (req, res) => {

  },
  update: (req, res, next) => {

  },
  delete: (req, res, next) => {

  },
  newView: (req, res) => {
    res.render('category/new')
  },
  create: (req, res, next) => {

  },
  index: (req, res, next) => {
    models.Category.getCategoryList(categoryList => {
      res.locals.categoryList = categoryList
      console.log(categoryList)
      next()
    }, next)
  },
  indexView: (req, res) => {
    res.render('category/index')
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    redirectPath ? res.redirect(redirectPath) : next()
  }
}
