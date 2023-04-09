// get the client
const mysql = require('mysql2/promise')

;(async () => {
  const connection = await mysql.createConnection(
    {
      host: 'mysql-db',
      user: 'user',
      password: 'passw0rd',
      database: 'todo_mysql_app'
    }
  )
  try {
    const user = { name: 'taro', age: 10 }
    const res = await connection.query('INSERT INTO Users SET ?', user)
    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    connection.end()
  }
})()
