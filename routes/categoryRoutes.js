'use strict'

const router = require('express').Router()
const categoryController = require('../controllers/categoryController')

// 登録画面表示
router.get('/new', categoryController.newView)
// 登録処理
router.post('/create', categoryController.create, categoryController.redirectView)
// 更新画面表示
router.get('/:id/edit', categoryController.show, categoryController.editView)
// 更新処理
router.put('/:id', categoryController.update, categoryController.redirectView)
// 削除処理
router.delete('/:id', categoryController.delete, categoryController.redirectView)
// 照会画面表示
router.get('/:id', categoryController.show, categoryController.showView)
// 一覧画面表示
router.get('/', categoryController.index, categoryController.indexView)

module.exports = router
