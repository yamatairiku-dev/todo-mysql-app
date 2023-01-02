'use strict'

const models = require('../models')

module.exports = {
  show: (req, res, next) => {

  },
  showView: (req, res) => {

  },
  editView: (req, res) => {

  },
  update: (req, res, next) => {

  },
  delete: (req, res, next) => {

  },
  new: (req, res, next) => {
    res.locals.sei = ''
    res.locals.mei = ''
    next()
  },
  newView: (req, res) => {
    res.render('user/new')
  },
  create: async (req, res, next) => {
    const refererUrl = req.headers.referer
    const userId = req.body.userId
    const sei = req.body.sei
    const mei = req.body.mei
    const password = req.body.password

    const isUnique = await models.User.isUnique(userId).catch(error => next(error))
    if (!isUnique) {
      res.locals.sei = sei
      res.locals.mei = mei
      res.locals.flashMessages = { error: `User ID: ${userId} は既に使われています!` }
      next()
      return isUnique // 処理を抜ける
    }

    const id = await models.User.add(userId, password, sei, mei).catch(error => next(error))
    if (!id) {
      req.flash('error', '登録失敗!')
      res.locals.redirect = refererUrl
    } else {
      req.flash('success', '登録成功!')
      res.locals.redirect = '/users'
    }
    next()
  },
  index: (req, res, next) => {
    models.User.getList().then(userList => {
      res.locals.users = userList
      next()
    }, next)
  },
  indexView: (req, res) => {
    res.render('user/index')
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    redirectPath ? res.redirect(redirectPath) : next()
  }
}
