const Character = require('../../database/db_schemas/user_schemas/character_schema');
const mongoose = require('mongoose');
const connect_to_mongo=require('../../database/db_create/connectdb')

module.exports= async (req, res) => {
    try {
      
        await connect_to_mongo();//calling the mongodb function for establishing connection
        
        const character = await Character.find({});

      //if we have successfully fetched all the characters details then success message is generated
      await res.status(200).send({success:true,message:"ALL CHARACTER DETAILS :" ,data :character})
    }
    catch (error) {
      
      //if some error is encountered during character schema fetching then error message is generated
      // console.log(error)
      res.status(200).send({success:false,message :"ERROR IN CHARACTER DETAILS FETCHING" , data : error})
    }
    finally {
      //database is closed after it has been used
      await mongoose.disconnect();
      // console.log('Disconnected from the database')
    }
}