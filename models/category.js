'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Category extends Model {
    static associate (models) {
      // 必要があればここにテーブルの関連付けを書く
      // メソッド自体は削除しない
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
