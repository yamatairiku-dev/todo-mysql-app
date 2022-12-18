'use strict'

module.exports = function getPagination (PAGETATION_COLS, pageCount, currentPage) {
  const diff = pageCount - PAGETATION_COLS
  const PAGETATION_COLS_CENTER = Math.ceil(PAGETATION_COLS / 2)
  const pageNumArr = new Array(PAGETATION_COLS)
  let pagePre = null
  let pageNext = null
  let pagenation = {}

  if (diff <= 0) {
    for (let i = 1; i <= pageCount; i++) {
      pageNumArr[i - 1] = i
    }
    pagenation = { pagePre, currentPage, pageNext, pageNumArr }
    return pagenation
  }

  let offset = 0
  if (currentPage <= PAGETATION_COLS_CENTER) {
    pagePre = currentPage !== 1 ? currentPage - 1 : null
    pageNext = currentPage + 1
  } else if (pageCount - currentPage < PAGETATION_COLS_CENTER) {
    offset = diff
    pagePre = currentPage - 1
    pageNext = currentPage !== pageCount ? currentPage + 1 : null
  } else {
    offset = currentPage - PAGETATION_COLS_CENTER
    pagePre = currentPage - 1
    pageNext = currentPage + 1
  }
  for (let i = 1; i <= PAGETATION_COLS; i++) {
    pageNumArr[i - 1] = i + offset
  }
  pagenation = { pagePre, currentPage, pageNext, pageNumArr }
  return pagenation
}
