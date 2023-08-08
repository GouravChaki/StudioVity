const Character = require('../../database/db_schemas/user_schemas/character_schema');
const mongoose = require('mongoose');
const connect_to_mongo=require('../../database/db_create/connectdb')

module.exports= async (req, res) => {
    try {
      
        await connect_to_mongo();//calling the mongodb function for establishing connection

        //extracting user details from request
        const {id}=req.body;
        
        if(!id)//if character exists it will simply return with an error that credentials exists
        {
            res.status(200).send({success:false,message:"CHARACTER ID NOT PROVIDED", data: req.body});
            return;
        }
        
        const character = await Character.findById(id);

        if(!character)
        {
            res.status(200).send({success:false,message:"CHARACTER DOESN'T EXISTS", data: req.body});
            return;
        }
      
      //if we have successfully fetched details then success message is generated
      await res.status(200).send({success:true,message:"CHARACTER DETAILS :" ,data :character})
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