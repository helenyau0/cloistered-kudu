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
  const rank = `SELECT id, task, completed, rank() OVER(ORDER BY id ASC) FROM todo`
  return db.any(psql, [task], [rank])

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



const swapRanks = (taskA, taskB) => {
  const sqlA = `UPDATE todo SET rank=$4 WHERE id=$1`
  const varA = [taskA.id, taskB.rank]

  const sqlB = `UPDATE todo SET rank=$4 WHERE id=$1`
  const varB = [taskB.id, taskA.rank]

  return Promise.all([
    db.none(sqlA, varA),
    db.none(sqlB, varB)
  ])
}

const moveTask = (direction, id) => {
  return getAllToDos()
    .then(todo => {
      const taskA = todo.find(todo => todo.id === parseInt(id.id))
      console.log('taskA', taskA);
      const oldRank = taskA.rank
      const newRank = oldRank + direction
      const taskB = todo.find(todo => todo.rank === newRank)
      console.log('taskB', taskB);
      return swapRanks(taskA, taskB)
    })
}

const moveUp = (id) => {
  return moveTask(1, id)
}

const moveDown = (id) => {
  return moveTask(-1, id)
}

module.exports = { getAllToDos, addToDo, completed, removeItem, getOneToDo, updateItem, moveTask, moveUp, moveDown, swapRanks }
