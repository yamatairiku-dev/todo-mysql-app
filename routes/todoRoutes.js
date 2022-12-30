'use strict'

const router = require('express').Router()
const todoController = require('../controllers/todoController')

// ToDo一覧の取得
router.get('/', todoController.index, todoController.indexView, todoController.redirectView)
// ToDoを完了
router.put('/:id/completed', todoController.doCompleted, todoController.redirectView)
// ToDoを未完了
router.delete('/:id/completed', todoController.undoCompleted, todoController.redirectView)
// ToDoの削除
router.delete('/:id', todoController.deleteTodo, todoController.redirectView)
// ToDoの新規登録画面表示
router.get('/new', todoController.newTodo)
// ToDoの新規登録
router.post('/create', todoController.createTodo, todoController.redirectView)

module.exports = router
