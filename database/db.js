const pgp = require('pg-promise')()
const fs = require('fs')

if(fs.existsSync('.env')) {
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString)

// all of my queries
const getAllToDos = () => {
  const psql = `SELECT * FROM todo`
  return db.any(psql)
}
const addToDo = (task) => {
  const psql = `INSERT INTO todo(task) VALUES($1) RETURNING *`
  return db.oneOrNone(psql, task)
}

// const Todos = {
//   getAllTodos: () => db.any( GET_ALL_TODOS, [] ),
//   addTodo: ( newTask ) => db.one( ADD_TODO, [newTask]),
// }

module.exports = {getAllToDos:getAllToDos, addToDo:addToDo}
