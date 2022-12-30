'use strict'

const { StatusCodes } = require('http-status-codes')

module.exports = {
  // 404でレスポンス
  pageNotFoundError: (req, res) => {
    const errorCode = StatusCodes.NOT_FOUND
    res.status(errorCode)
    res.render('error', { title: 'Not Found!', url: req.url })
  },
  // 全てのエラーをキャッチ
  internalServerError: (error, req, res, next) => {
    const errorCode = StatusCodes.INTERNAL_SERVER_ERROR
    console.log(`ERROR occured: ${error.stack}`)
    res.status(errorCode)
    res.send(`${errorCode} | Sorry, our aplication is taking a nap!`)
  }
}
