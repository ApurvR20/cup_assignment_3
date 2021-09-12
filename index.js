const dotenv = require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const app = express()
const db = require('./config/mongoose')

app.use(express.json())
app.use('/',require('./routes'))
//start a server

app.listen(port, ()=> console.log("Server is up and running at port", port))