const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT||3000;
const Character=require('./Router/character_routes')
const Relation=require('./Router/relation_routes')

app.use(express.json());
app.use(cors());
app.use('/',Character,Relation);

app.listen(port,()=>{
    console.log("Server established at port ")
})