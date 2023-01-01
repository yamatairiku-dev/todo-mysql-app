'use strict'

const models = require('../models')

;(async () => {
  await models.sequelize.drop()
  await models.Category.sync({ force: true })
  await models.Todo.sync({ force: true })
  await models.User.sync({ force: true })
})()
