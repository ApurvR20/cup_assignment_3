const express = require('express')
const router = express.Router()

//router.get("/",(req,res)=> res.send("Hello World"))
router.use('/v1',require('./v1'))
module.exports = router