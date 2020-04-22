const express = require('express')
const app = express()
const path = require('path')
//const router = express.Router()

console.log('Web Server up and running !!')
console.log(process.env.NODE_ENV)
console.log(__dirname)

require('custom-env').env(process.env.NODE_ENV, 'src/env')

// set up middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// athletes api routes
app.use('/api/athletes', require('./src/api/athletesApi'))

app.use('/api/athletes', require('./src/api/athletesApi'))

app.get('/api/test', async (req, res) => {
  const resultContext = {hello: "blah"}
  res.send(resultContext)
})

app.listen(process.env.PORT || 5000)

module.exports = app