'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('Todo', [
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '遊園地へ行く', deadline: '2022/12/10', categoryId: 1, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '資料を作成する', deadline: '2022/12/10', categoryId: 2, createdAt: now, updatedAt: now },
      { id: uuidv4(), title: '釣りへ行く', deadline: '2022/12/10', categoryId: 3, createdAt: now, updatedAt: now }
    ], {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todo', null, {})
  }
}
