'use strict'

const { StatusCodes } = require('http-status-codes')

module.exports = {
  // 400番台のエラーレスポンス(404以外)
  clientError: (req, res, next) => {
    res.locals.errCode = res.locals.errCode || StatusCodes.BAD_REQUEST
    res.locals.errMsg = res.locals.errMsg || 'たぶんリクエストが悪い'
    res.locals.errDescription = res.locals.errDescription || ''
    res.locals.reqUrl = res.locals.reqUrl || ''
    next()
  },
  // 経路が見つからなければ404でレスポンス
  pageNotFoundError: (req, res, next) => {
    res.locals.errCode = StatusCodes.NOT_FOUND
    res.locals.errMsg = 'ページが見つかりません!'
    res.locals.errDescription = ''
    res.locals.reqUrl = req.url
    next()
  },
  errorView: (req, res, next) => {
    res.render('error/error')
  }
}
