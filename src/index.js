const express = require('express')
require('./db/mongoose')
const apiRouter = require('./routers/api')
const path = require('path')
const hbs = require('hbs')
const Task = require('./models/tasks')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', async (req, res) => {
	res.render('index')
})



app.use(express.json())
app.use(apiRouter)




// Start sever listening
app.listen(port, () => {
	console.log('Server is up on port ' + port)
})