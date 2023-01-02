'use strict'

module.exports = {
  showIndex: (req, res) => {
    if (!req.session.views) {
      req.session.views = 0
    }
    const viewCount = req.session.views++
    console.log(`View Count: ${viewCount}`)
    res.render('index')
  }
}
