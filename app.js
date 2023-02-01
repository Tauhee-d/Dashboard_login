const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./db/conn')
// middleware
app.use(cors({origin:true}))
app.use(express.json())

// Routes

const UserRoutes = require('./routes/userroute')
app.use('/', UserRoutes)
 
const port = process.env.PORT || 8080
app.listen(port, console.log(`listening on ${port}...`))