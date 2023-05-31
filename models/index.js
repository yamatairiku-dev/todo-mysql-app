'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename) // パスを含まないこのファイル名
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.json'))[env]
const db = {}
const serverCa = [fs.readFileSync('DigiCertGlobalRootCA.crt.pem', 'utf8')]

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialectOptions: {
      ssl: {
        ca: serverCa,
        rejectUnauthorized: true
      }
    }
  })
  // 例: DB_CONNECTION_URI='mysql://user:passw0rd@mysql-db:3306/todo_app_development'
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') // ドットファイルでない、且つ、このファイルでない、且つ、拡張子が.js
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
