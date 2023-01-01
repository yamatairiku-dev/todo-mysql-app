'use strict'

const getPagination = require('../subroutine/getPagenation')
const ITEM_PER_PAGE = 10 // 1ページあたりの行数を設定
const PAGETATION_COLS = 5 // ページネーションの列数を設定
const models = require('../models')

module.exports = {
  index: (req, res, next) => {
    // 表示ページの設定
    const page = !req.query.page ? 1 : Number(req.query.page) // クエリは文字列として扱われる

    // orderの設定
    let orderQuery = req.query.order_by
    const orderList = { updated_asc: [['updatedAt', 'ASC']], updated_desc: [['updatedAt', 'DESC']], created_asc: [['createdAt', 'ASC']], created_desc: [['createdAt', 'DESC']] }
    const orderClause = orderList[`${orderQuery}`]
    if (!orderClause) {
      orderQuery = ''
    }

    // 完了・未完了・全ての表示設定
    let completedQuery = req.query.completed
    let whereClause = {}
    if (completedQuery === 'true') {
      whereClause = { completed: true }
    } else if (completedQuery === 'false') {
      whereClause = { completed: false }
    } else {
      whereClause = undefined
      completedQuery = ''
    }

    // ToDoリストをデータベースより取得
    models.Todo.getTodoList(ITEM_PER_PAGE, page, whereClause, orderClause).then(todoListWithCount => {
      res.locals.todoListWithCount = todoListWithCount
      res.locals.page = page
      res.locals.orderQuery = orderQuery
      res.locals.completedQuery = completedQuery
      next()
    }, next)
  },
  indexView: (req, res, next) => {
    const todoListWithCount = res.locals.todoListWithCount
    const page = res.locals.page
    const orderQuery = res.locals.orderQuery
    const completedQuery = res.locals.completedQuery
    // アイテム数
    const itemNum = todoListWithCount.count
    const countTodoList = todoListWithCount.todoList.length
    const refererUrl = req.headers.referer

    // ページまたぎの処理
    if (itemNum > 0) {
      if (countTodoList < 1) {
        let nextPage = page
        nextPage--
        const nextUrl = refererUrl.replace(`page=${page}`, `page=${nextPage}`)
        // res.redirect(nextUrl)
        res.locals.redirect = nextUrl
        next()
      }
    }
    // 総ページ数
    const pageCount = Math.ceil(itemNum / ITEM_PER_PAGE)
    // ページネーションを取得
    const pagenation = getPagination(PAGETATION_COLS, pageCount, page)

    // ソート順リスト
    const sortOrderList = ['order_by=', 'order_by=updated_desc', 'order_by=updated_asc', 'order_by=created_desc', 'order_by=created_asc']
    const sortOrderListName = ['並び替え順', '更新が新しい順', '更新が古い順', '作成が新しい順', '作成が古い順']
    const sortOrderQuery = 'order_by=' + orderQuery
    const i = sortOrderList.indexOf(sortOrderQuery)
    const sortOrderSelected = Array(sortOrderList.length)
    sortOrderSelected[i] = 'selected'
    // 完了状態ラジオボタンリスト
    const completedConditionList = ['completed=', 'completed=true', 'completed=false']
    const completedConditionQuery = 'completed=' + completedQuery
    const j = completedConditionList.indexOf(completedConditionQuery)
    const completedConditionChecked = Array(completedConditionList.length)
    completedConditionChecked[j] = 'checked'
    res.render('todo/index', {
      todos: todoListWithCount.todoList,
      pagenation,
      itemNum,
      itemPerPage: ITEM_PER_PAGE,
      sortOrderList,
      sortOrderSelected,
      sortOrderListName,
      completedConditionList,
      completedConditionChecked
    })
  },
  doCompleted: (req, res, next) => {
    const id = req.params.id
    const refererUrl = req.headers.referer
    const update = {
      completed: true
    }
    models.Todo.modTodo(id, update).then(id => {
      // 更新の成否を判定
      if (!id) {
        req.flash('error', '更新失敗！')
      }
      res.locals.redirect = refererUrl
      next()
    }, next)
  },
  undoCompleted: (req, res, next) => {
    const id = req.params.id
    const refererUrl = req.headers.referer
    const update = {
      completed: false
    }
    models.Todo.modTodo(id, update).then(id => {
      // 更新の成否を判定
      if (!id) {
        req.flash('error', '更新失敗！')
      }
      res.locals.redirect = refererUrl
      next()
    }, next)
  },
  delete: (req, res, next) => {
    const id = req.params.id
    const refererUrl = req.headers.referer
    models.Todo.delTodo(id).then(id => {
      // 削除の成否を判定
      if (!id) {
        req.flash('error', '削除失敗！')
      }
      res.locals.redirect = refererUrl
      next()
    }, next)
  },
  // カテゴリーコントローラのshowメソッドと同じ
  getCategoryList: (req, res, next) => {
    models.Category.getCategoryList().then(categoryList => {
      res.locals.categoryList = categoryList
      next()
    }, next)
  },
  newView: (req, res) => {
    res.render('todo/new')
  },
  create: (req, res, next) => {
    const title = req.body.title
    const categoryId = req.body.category
    const deadline = req.body.deadline
    models.Todo.addTodo(title, categoryId, deadline).then((id) => {
      req.flash('success', `ToDo登録成功! ID: ${id}`)
      res.locals.redirect = '/todos?completed=&order_by=updated_desc'
      next()
    }, next)
  },
  edit: (req, res, next) => {
    const id = req.params.id
    models.Todo.getTodo(id).then(todo => {
      res.locals.todo = todo
      next()
    }, next)
  },
  editView: (req, res) => {
    res.render('todo/edit')
  },
  update: (req, res, next) => {
    const id = req.params.id
    const refererUrl = req.headers.referer
    const update = {
      title: req.body.title,
      categoryId: req.body.category,
      deadline: req.body.deadline
    }
    models.Todo.modTodo(id, update).then((id) => {
      // 成否を判定
      if (!id) {
        req.flash('error', '更新失敗！')
        res.locals.redirect = refererUrl
      } else {
        req.flash('success', '更新成功！')
        res.locals.redirect = '/todos?completed=&order_by=updated_desc'
      }
      next()
    }, next)
  },
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect
    redirectPath ? res.redirect(redirectPath) : next()
  }
}
