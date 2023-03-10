'use strict'

module.exports = {
  showIndex: (req, res) => {
    if (!req.session.views) {
      req.session.views = 0
    }
    const viewCount = req.session.views++
    console.log(`View Count: ${viewCount}`)
    console.log(`Login User: ${JSON.stringify(res.locals.currentUser)}`)
    res.render('index')
  }
}
