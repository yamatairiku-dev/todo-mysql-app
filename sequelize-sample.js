/**
 * Sequelize CRUD Sample
 * 出典: https://blog.katsubemakito.net/nodejs/mysql-sequelize1
 */
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sequelize_test', 'user', 'passw0rd', {
  host: 'mysql-db',
  dialect: 'mysql',
  logging: false
})

// --------------------------------------------
// Models
// --------------------------------------------
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  }
})

// --------------------------------------------
// CRUD
// --------------------------------------------
;(async () => {
  // MySQL上にテーブルを作成
  await User.sync({ alter: true })

  // 既存のデータを削除(TRUNCATE)
  await User.destroy({
    truncate: true
  })

  // Userテーブルへデータを挿入
  await User.bulkCreate([
    { name: 'Honda', age: 18 },
    { name: 'Yamaha', age: 16 },
    { name: 'Suzuki', age: 20 },
    { name: 'Kawasaki', age: 24 }
  ])

  // 'Suzuki'のageを21に更新
  await User.update({ age: 21 }, {
    where: {
      name: 'Suzuki'
    }
  })

  // 'Yamaha'を削除
  await User.destroy({
    where: {
      name: 'Yamaha'
    }
  })

  // Userテーブルの全レコードを取得
  const rows = await User.findAll()
  rows.forEach(row => {
    const id = row.id
    const name = row.name
    const age = row.age

    console.log(`${id}: ${name} ${age}`)
  })

  // MySQLから切断
  await sequelize.close()
})()
