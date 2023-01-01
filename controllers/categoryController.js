'use strict'

const models = require('../models')

module.exports = {
  show: (req, res, next) => {
    const id = req.params.id
    models.Category.getCategory(id).then(category => {
      res.locals.category = category
      next()
    }, next)
  },
  showView: (req, res) => {
    res.render('category/show')
  },
  editView: (req, res) => {
    res.render('category/edit')
  },
  update: (req, res, next) => {
    const id = req.params.id
    const value = {
      name: req.body.category
    }
    const refererUrl = req.headers.referer
    models.Category.modCategory(id, value).then(id => {
      // 成否を判定
      if (!id) {
        req.flash('error', '更新失敗！')
        res.locals.redirect = refererUrl
      } else {
        req.flash('success', '更新成功！')
        res.locals.redirect = '/categories'
      }
      next()
    }, next)
  },
  delete: (req, res, next) => {
    const id = req.params.id
    const refererUrl = req.headers.referer
    models.Category.delCategory(id).then(id => {
      // 削除の成否を判定
      if (!id) {
        req.flash('error', '削除失敗！')
        res.locals.redirect = refererUrl
      } else {
        req.flash('success', '削除成功！')
        res.locals.redirect = '/categories'
      }
      next()
    }, next)
  },
  newView: (req, res) => {
    res.render('category/new')
  },
  create: (req, res, next) => {
    const category = req.body.category
    const refererUrl = req.headers.referer
    models.Category.addCategory(category).then(id => {
      // 登録の成否を判定
      if (!id) {
        req.flash('error', '登録失敗！')
        res.locals.redirect = refererUrl
      } else {
        req.flash('success', '登録成功！')
        res.locals.redirect = '/categories'
      }
      next()
    })
  },
  index: (req, res, next) => {
    models.Category.getCategoryList().then(categoryList => {
      res.locals.categories = categoryList
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
