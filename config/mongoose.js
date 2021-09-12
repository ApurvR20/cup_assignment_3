const mongoose = require('mongoose')

mongoose.connect(process.env.ATLAS_URL, { useNewUrlParser: true})

const db = mongoose.connection;
db.on("error",console.error.bind(console, "Error connecting to db"))
db.once("open",()=>console.log("Connected to DB"))

module.exports = db;