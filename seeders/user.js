'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('User', [
      { id: 'tairiku', password: 'tairiku', sei: '中村', mei: '大陸', createdAt: now, updatedAt: now }
    ], {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {})
  }
}
