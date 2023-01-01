'use strict'

const { Model, DataTypes } = require('sequelize')
const formatter = require('../subroutine/formatter')

module.exports = (sequelize) => {
  class Todo extends Model {
    static associate (models) {
      // 必要があればここにテーブルの関連付けを書く
      // メソッド自体は削除しない
      Todo.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        targetKey: 'id'
      })
    }

    // Todoの登録
    static async addTodo (title, categoryId, deadline) {
      const todo = await this.create({
        title,
        categoryId,
        deadline
      })
      return todo.dataValues.id
    }

    // Todoの取得
    static async getTodo (id) {
      const todoData = await this.findByPk(id, {
        include: 'Category',
        attributes: [
          'id',
          'title',
          'completed',
          'deadline',
          'Category.name',
          'createdAt',
          'updatedAt'
        ]
      })
      const todo = todoData.dataValues
      todo.category = todo.Category.dataValues.name
      todo.deadline = formatter.formatDate(todo.deadline)
      delete todo.Category
      return todo
    }

    // Todo一覧の取得
    static async getTodoList (ITEM_PER_PAGE, page, whereClause, orderClause) {
      const todos = await this.findAndCountAll({
        include: 'Category',
        attributes: [
          'id',
          'title',
          'completed',
          'deadline',
          'Category.name',
          'createdAt',
          'updatedAt'
        ],
        where: whereClause,
        order: orderClause,
        limit: ITEM_PER_PAGE,
        offset: ITEM_PER_PAGE * (page - 1)
      })
      const count = todos.count
      const todoList = []
      todos.rows.forEach(element => {
        const todo = element.dataValues
        todo.category = todo.Category.dataValues.name
        todo.deadline = formatter.formatDate(todo.deadline)
        todo.updatedAt = formatter.formatDate(todo.updatedAt) + ' ' + formatter.formatHourMin(todo.updatedAt)
        delete todo.Category
        todoList.push(todo)
      })
      const todoListWithCount = { count, todoList }
      return todoListWithCount
    }

    // ToDoの更新
    static async modTodo (id, value) {
      const changes = await this.update(
        value,
        {
          where: { id }
        }
      )
      return changes[0] === 1 ? id : null
    }

    // ToDoの削除
    static async delTodo (id) {
      const changes = await this.destroy(
        {
          where: { id }
        }
      )
      return changes === 1 ? id : null
    }
  }

  Todo.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    completed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deadline: {
      allowNull: false,
      type: DataTypes.DATE
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        modelName: 'Category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    freezeTableName: true
  })
  return Todo
}
