const pgp = require('pg-promise')()
const fs = require('fs')

if(fs.existsSync('.env')) {
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString)

// all of my queries
const getAllToDos = () => {
  const psql = `SELECT * FROM todo ORDER BY completed`
  return db.any(psql)
}

const getOneToDo = (id) => {
  const psql = `SELECT * FROM todo WHERE id=$1`
  return db.one(psql, [id])
}

const addToDo = (task) => {
  const psql = `INSERT INTO todo(task) VALUES($1)`
  return db.none(psql, [task])
}

const completed = (id) => {
  const psql = `UPDATE todo SET completed = NOT completed WHERE id=$1`
  return db.none(psql, [id])
}

const removeItem = (id) => {
  const psql = `DELETE FROM todo WHERE id=$1`
  return db.none(psql, [id])
}

const updateItem = (id, task) => {
  const psql = 'UPDATE todo SET task=$2 WHERE id=$1'
  return db.none(psql, [id, task])
}

module.exports = { getAllToDos, addToDo, completed, removeItem, getOneToDo, updateItem }
