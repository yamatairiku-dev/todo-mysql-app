'use strict'

const router = require('express').Router()
const userController = require('../controllers/userController')

// 登録画面表示
router.get('/new', userController.newView)
// 登録処理
router.post('/create', userController.create, userController.redirectView)
// 更新画面表示
router.get('/:id/edit', userController.show, userController.editView)
// 更新処理
router.put('/:id', userController.update, userController.redirectView)
// 削除処理
router.delete('/:id', userController.delete, userController.redirectView)
// 照会画面表示
router.get('/:id', userController.show, userController.showView)
// 一覧画面表示
router.get('/', userController.index, userController.indexView)

module.exports = router
