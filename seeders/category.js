'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('Category', [
      { name: 'ファミリー', createdAt: now, updatedAt: now },
      { name: '仕事', createdAt: now, updatedAt: now },
      { name: '趣味', createdAt: now, updatedAt: now }
    ], {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {})
  }
}
