const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT||3000;
const Character=require('./Router/character_routes')
const Relation=require('./Router/relation_routes')
const Account=require('./Router/account_routes')
const Report=require('./Router/character_report_routes')

app.use(express.json());
app.use(cors());
app.use('/',Character,Relation,Account,Report);

app.listen(port,()=>{
    console.log("Server established at port ")
})