const express = require('express')
const app = express()
const path = require('path')

require('custom-env').env(process.env.NODE_ENV, 'src/env')

// set up middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// athletes api routes
app.use('/api/athletes', require('./src/api/athletesApi'))

app.get('/api/test', (req, res) => {
  res.send({db: process.env.DBConnection})
})

console.log('process.env.DBConnection')
console.log(process.env.DBConnection)

app.listen(process.env.PORT || 5000)

module.exports = app