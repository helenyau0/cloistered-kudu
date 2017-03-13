const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.use(express.static('views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.render(__dirname + '/views/index.html')

})

app.listen(3000, function() {
  console.log('listening on port:3000')
})

module.exports = app;
