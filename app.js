const express = require('express')
const app = express()
const path = require('path')
const db = require('./database/db')
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(request, response ) {
  db.getAllToDos()
  .then( allMyTodos => {
    console.log('all my todos', allMyTodos);
    response.render('index', {allMyTodos})
  })
})

app.post('/api/todos', function (req, res, next) {
  console.log('this is the body -->', req.body);
  db.addToDo(req.body.todo)
    .then( () => res.redirect('/'))
    .catch(error => next(error))
})

app.listen(3000, function() {
  console.log('listening on port:3000')
})

module.exports = app;
