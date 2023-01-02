'use strict'

const express = require('express')
const expressSession = require('express-session')
const expressEjsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('./models')
const router = require('./routes/index')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}))
app.use(cookieParser('secret_passcode'))
app.use(expressSession({
  name: 'MyTodoApp',
  secret: 'secret_passcode',
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(connectFlash())

// パスポート設定
passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await models.User.getOne(username)
    if (user && user.password === password) {
      // login成功
      return done(null, user)
    } else {
      // login失敗
      return done(null, false)
    }
  }
))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(
  (user, done) => {
    done(null, user.id)
  }
)
passport.deserializeUser(
  async (id, done) => {
    const user = await models.User.getOne(id)
    if (user) {
      return done(null, user)
    } else {
      throw new Error('User not found')
    }
  }
)

// 下記処理はシリアライズ・デシリアライズ設定の後に記述必要
app.use((req, res, next) => {
  res.locals = {
    flashMessages: req.flash(),
    loggedIn: req.isAuthenticated(),
    currentUser: req.user
  }
  next()
})

app.use('/', router)

// エラーハンドリング
app.use((error, req, res, next) => {
  console.error(error)
  const errCode = error.code || 500
  const errMsg = error.name || '何らかのエラーが発生!'
  const errDescription = `${error.stack}`
  const reqUrl = req.url
  res.render('error/error', { errCode, errMsg, errDescription, reqUrl })
})

// アプリケーションのリスナー設定
app.listen(port, () => console.log(`Todo MySql App listening on port ${port}!`))
