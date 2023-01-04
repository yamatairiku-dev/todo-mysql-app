'use strict'

const { Model, DataTypes } = require('sequelize')
// const bcrypt = require('bcrypt')
// const saltRounds = 10
// async function hashPassword (password) {
//   const salt = await bcrypt.genSalt(saltRounds)
//   const hashed = await bcrypt.hash(password, salt)
//   return hashed
// }

// const hashedPass = await hashPassword(password)
// const id = await models.User.add(username, hashedPass, sei, mei).catch(error => next(error))
// verifyPassword: async (passA, passB) => {
//   const isMatch = await bcrypt.compare(passA, passB)
//   return isMatch
// }

module.exports = (sequelize) => {
  class User extends Model {
    static associate (models) {
      // 必要があればここにテーブルの関連付けを書く
      // メソッド自体は削除しない
    }

    // パスワードチェック
    static async varifyPassword (username, password) {
      const userData = await this.findByPk(username, {
        attributes: [
          'id',
          'password',
          'sei',
          'mei'
        ]
      })
      const user = userData.dataValues
      const result = { isMatch: null, user: null }
      if (user && user.password === password) {
        // login成功
        result.isMatch = true
        delete user.password
        result.user = user
      } else {
        // login失敗
        result.isMatch = false
        result.user = null
      }
      return result
    }

    // 一覧
    static async getList () {
      const usersData = await this.findAll({
        attributes: [
          'id',
          'password',
          'sei',
          'mei'
        ]
      })
      const userList = []
      usersData.forEach(element => {
        userList.push(element.dataValues)
      })
      return userList
    }

    // 単票
    static async getOne (id) {
      const userData = await this.findByPk(id, {
        attributes: [
          'id',
          'password',
          'sei',
          'mei'
        ]
      })
      const user = userData.dataValues
      return user
    }

    // ID重複チェエック
    static async isUnique (id) {
      // IDに重複がないかチェック
      const count = await this.count(
        {
          where: { id }
        }
      )
      if (count === 0) {
        return true
      } else {
        return false
      }
    }

    // 登録
    static async add (id, password, sei, mei) {
      const user = await this.create({
        id,
        password,
        sei,
        mei
      })
      return user.dataValues.id
    }

    // 更新
    static async modify (id, value) {
      const changes = await this.update(
        value,
        {
          where: { id }
        }
      )
      return changes[0] === 1 ? id : null
    }

    // 削除
    static async delete (id) {
      const changes = await this.destroy(
        {
          where: { id }
        }
      )
      return changes === 1 ? id : null
    }
  }

  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sei: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mei: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  })
  return User
}
