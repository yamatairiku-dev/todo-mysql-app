'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Category extends Model {
    static associate (models) {
      // 必要があればここにテーブルの関連付けを書く
      // メソッド自体は削除しない
    }

    // 一覧
    static async getCategoryList () {
      const categories = await this.findAll({
        attributes: [
          'id',
          'name'
        ]
      })
      const categoryList = []
      categories.forEach(element => {
        categoryList.push(element.dataValues)
      })
      return categoryList
    }

    // 単票
    static async getCategory (id) {
      const categoryData = await this.findByPk(id, {
        attributes: [
          'id',
          'name'
        ]
      })
      const category = categoryData.dataValues
      return category
    }

    // 登録
    static async addCategory (name) {
      const category = await this.create({
        name
      })
      return category.dataValues.id
    }

    // 更新
    static async modCategory (id, value) {
      const changes = await this.update(
        value,
        {
          where: { id }
        }
      )
      return changes[0] === 1 ? id : null
    }

    // 削除
    static async delCategory (id) {
      const changes = await this.destroy(
        {
          where: { id }
        }
      )
      return changes === 1 ? id : null
    }
  }

  Category.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.SMALLINT.UNSIGNED
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true
  })
  return Category
}
