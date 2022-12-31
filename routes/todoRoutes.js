'use strict'

const router = require('express').Router()
const todoController = require('../controllers/todoController')

// ToDoを完了
router.put('/:id/completed', todoController.doCompleted, todoController.redirectView)
// ToDoを未完了
router.delete('/:id/completed', todoController.undoCompleted, todoController.redirectView)
// ToDoの更新画面表示
router.get('/:id/edit', todoController.edit, todoController.getCategoryList, todoController.editView)
// ToDoの更新
router.put('/:id', todoController.update, todoController.redirectView)
// ToDoの削除
router.delete('/:id', todoController.delete, todoController.redirectView)
// ToDoの追加登録画面表示
router.get('/new', todoController.getCategoryList, todoController.newView)
// ToDoの追加登録
router.post('/create', todoController.create, todoController.redirectView)
// ToDo一覧の取得
router.get('/', todoController.index, todoController.indexView, todoController.redirectView)

module.exports = router
