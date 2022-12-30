'use strict'

const getPagination = require('./subroutine/getPagenation')
const models = require('./models')
const express = require('express')
const expressSession = require('express-session')
const expressEjsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
// passport = require("passport")

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}))
app.use(cookieParser('secret_passcode'))
app.use(expressSession({
  secret: 'secret_passcode',
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(connectFlash())

// パスポート設定
// passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// 下記処理はシリアライズ・デシリアライズ処理の後に記述必要
app.use((req, res, next) => {
  res.locals = {
    flashMessages: req.flash()
    // loggedIn: req.isAuthenticated(),
    // currentUser: req.user
  }
  next()
})

// ToDo一覧の取得
app.get('/todos', (req, res, next) => {
  // ページネーションの設定
  const ITEM_PER_PAGE = 10 // 1ページあたりの行数を設定
  const PAGETATION_COLS = 5 // ページネーションの列数を設定

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

  models.Todo.getTodoList(ITEM_PER_PAGE, page, whereClause, orderClause).then(todoListWithCount => {
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
        res.redirect(nextUrl)
      }
    }

    // 総ページ数
    const pageCount = Math.ceil(itemNum / ITEM_PER_PAGE)
    // ページネーションを取得
    const pagenation = getPagination(PAGETATION_COLS, pageCount, page)
    // console.log(pagenation) // ページネーションの確認

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
    console.log(completedConditionChecked)
    res.render('todos', {
      todos: todoListWithCount.todoList,
      pagenation,
      itemNum,
      itemPerPage: ITEM_PER_PAGE,
      sortOrderList,
      sortOrderSelected,
      sortOrderListName,
      completedConditionList,
      completedConditionChecked,
      orderQuery,
      completedQuery
    })
  }, next)
})

// ToDoの完了・未完了更新
app.put('/todos/:id/completed', (req, res, next) => {
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
    res.redirect(refererUrl)
  }, next)
})
app.delete('/todos/:id/completed', (req, res, next) => {
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
    res.redirect(refererUrl)
  }, next)
})

// ToDoの削除
app.delete('/todos/:id', (req, res, next) => {
  const id = req.params.id
  const refererUrl = req.headers.referer
  models.Todo.delTodo(id).then(id => {
    // 削除の成否を判定
    if (!id) {
      req.flash('error', '削除失敗！')
    }
    res.redirect(refererUrl)
  }, next)
})

// ToDoの新規登録
app.get('/todos/new', (req, res, next) => {
  models.Category.getCategoryList().then(categoryList => {
    res.render('new', {
      categoryList
    })
  }, next)
})
app.post('/todos/create', (req, res, next) => {
  const title = req.body.title
  const categoryId = req.body.category
  const deadline = req.body.deadline
  if (typeof title !== 'string' || !title) {
    // titleがリクエストに含まれない場合はステータスコード400(Bad Request)
    const err = new Error('title is required')
    err.statusCode = 400
    return next(err)
  }
  models.Todo.addTodo(title, categoryId, deadline).then((id) => {
    req.flash('success', `ToDo登録成功! ID: ${id}`)
    res.redirect('/todos')
  }, next)
})

// Home
app.get('/', (req, res) => res.render('index'))

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({ error: err.message })
})

app.listen(port, () => console.log(`Todo MySql App listening on port ${port}!`))
