const express = require('express')
const app = express()
const path = require('path')
const db = require('./database/db')
const logger = require('morgan')
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
// app.use('/', 'index')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(request, response ) {
  db.getAllToDos()
  .then( allMyTodos => {
    response.render('index', {allMyTodos})
  })
})

app.post('/api/todos', function (req, res, next) {
  const { todo } = req.body
  db.addToDo(req.body.todo)
  .then( () => res.redirect('/'))
})

app.post('/complete/:id', function (req, res, next) {
  const { id } = req.params
  db.completed(id)
  .then(() => {
    res.redirect('/')
  })
  .catch(error => next(error))
})

app.post('/delete/:id', function( req, res, next) {
  const { id } = req.params
  db.removeItem(id)
  .then(() => {
    res.redirect('/')
  })
  .catch(error => next (error))
})

app.get('/update/:id', function (req, res, next) {
  const { id } = req.params
  db.getOneToDo(id)
  .then((val) => {
    res.render('edit', {val})
  }).catch(error => next (error))
})

app.post('/update/:id', function (req, res, next) {
  const { id } = req.params
  const { task } = req.body
  db.updateItem(id, task)
  .then(() => {
    res.redirect('/')
  }).catch(error => next(error))
})

app.all('/:id/moveup', function (req, res, next) {
  const id = req.params
  console.log('idpls', id);
  db.moveUp(id)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => next(error))
})

app.all('/:id/movedown', function (req, res, next) {
  const id = req.params
  db.moveDown(id)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => next(error))
})



app.listen(3000, function() {
  console.log('listening on port:3000')
})

module.exports = app;
