
const mongoose = require('mongoose');
const connect_to_mongo=require('../../database/db_create/connectdb');
const Relation = require('../../database/db_schemas/user_schemas/relation_schema');

module.exports= async (req, res) => {
    try {
      
        await connect_to_mongo();//calling the mongodb function for establishing connection
        
        const relation = await Relation.find({});
        if(!relation){
            //if relation schema is empty
            await res.status(200).send({success:false,message:"NO RELATION DETAILS EXISTS :" ,data :relation})
        }
      //if we have successfully fetched all the relation details then success message is generated
      await res.status(200).send({success:true,message:"ALL RELATION DETAILS :" ,data :relation})
    }
    catch (error) {
      
      //if some error is encountered during relation schema fetching then error message is generated
      // console.log(error)
      res.status(200).send({success:false,message :"ERROR IN RELATION DETAILS FETCHING" , data : error})
    }
    finally {
      //database is closed after it has been used
      await mongoose.disconnect();
      // console.log('Disconnected from the database')
    }
}