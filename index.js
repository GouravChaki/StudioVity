const connect_to_mongo=require('./database/db_create/connectdb')
const express = require('express')
connect_to_mongo();//calling the mongodb function for establishing connection
const app = express()
const cors = require('cors')
const port = process.env.PORT||8000;

app.use(express.json())
app.use(cors())
// app.use('/',)

app.listen(port,()=>{
    console.log("Server established at port ")
})