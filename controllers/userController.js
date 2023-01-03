'use strict'

const passport = require('passport')
const bcrypt = require('bcrypt')
const models = require('../models')
const saltRounds = 10
async function hashPassword (password) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

module.exports = {
  show: async (req, res, next) => {
    const id = req.params.id
    const user = await models.User.getOne(id).catch(error => next(error))
    res.locals.user = user
    next()
  },
  showView: (req, res) => {
    res.render('user/show')
  },
  editView: (req, res) => {

  },
  update: (req, res, next) => {

  },
  delete: (req, res, next) => {

  },
  new: (req, res, next) => {
    if (!res.locals.user) {
      const user = { sei: '', mei: '' }
      res.locals.user = user
    }
    next()
  },
  newView: (req, res) => {
    res.render('user/new')
  },
  create: async (req, res, next) => {
    const refererUrl = req.headers.referer
    const username = req.body.username
    const sei = req.body.sei
    const mei = req.body.mei
    const password = req.body.password

    const isUnique = await models.User.isUnique(username).catch(error => next(error))
    if (!isUnique) {
      // req.flash('error', `User ID: ${username} は既に使われています!`)
      // res.locals.redirect = refererUrl
      const user = { sei, mei }
      res.locals.user = user
      res.locals.flashMessages = { error: `Username: ${username} は既に使われています!` }
      next()
      return isUnique // 処理を抜ける
    }
    const hashedPass = await hashPassword(password)
    const id = await models.User.add(username, hashedPass, sei, mei).catch(error => next(error))
    // const id = await models.User.add(username, password, sei, mei).catch(error => next(error))
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
  login: (req, res) => {
    res.render('user/login')
  },
  // passport.js ビルトインオプション
  // authenticate: passport.authenticate('local', {
  //   failureRedirect: '/users/login',
  //   failureFlash: 'ログイン失敗!',
  //   successRedirect: '/users',
  //   successFlash: 'ログイン成功!'
  // }),
  authenticate: (req, res, next) => {
    const refererUrl = req.headers.referer
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('error', 'ログイン失敗!')
        return res.redirect(refererUrl)
      }
      req.login(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', 'ログイン成功!')
        return res.redirect(`/users/${user.id}/show`)
        // res.locals.user = user
        // res.locals.flashMessages = { success: 'ログイン成功!' }
        // return next()
      })
    })(req, res, next)
  },
  verifyPassword: async (passA, passB) => {
    const isMatch = await bcrypt.compare(passA, passB)
    return isMatch
  },
  logout: (req, res, next) => {
    req.logout(err => {
      if (err) { return next(err) }
      req.flash('success', 'You have been logged out!')
      return res.redirect('/')
    })
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    redirectPath ? res.redirect(redirectPath) : next()
  }
}
