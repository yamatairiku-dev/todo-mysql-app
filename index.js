'use strict'

const express = require('express')
const expressSession = require('express-session')
const expressEjsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
const router = require('./routes/index')
// passport = require('passport')

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
  secret: 'secret_passcode',
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(connectFlash())

// パスポート設定
// passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// 下記処理はシリアライズ・デシリアライズ処理の後に記述必要
app.use((req, res, next) => {
  res.locals = {
    flashMessages: req.flash()
    // loggedIn: req.isAuthenticated(),
    // currentUser: req.user
  }
  next()
})

app.use('/', router)

// アプリケーションのリスナー設定
app.listen(port, () => console.log(`Todo MySql App listening on port ${port}!`))
