const Character = require('../../database/db_schemas/user_schemas/character_schema');
const Relation = require('../../database/db_schemas/user_schemas/relation_schema');
const mongoose = require('mongoose');
const connect_to_mongo=require('../../database/db_create/connectdb')

module.exports= async (req, res) => {
    try {
      
        await connect_to_mongo();//calling the mongodb function for establishing connection

        //extracting user details from request
        const {name, age,photos,gender,occupation}=req.body;
        
        if(!name || !age || !photos || !gender || !occupation)//if character exists it will simply return with an error that credentials exists
        {
            res.status(200).send({success:false,message:"VALUE MISSING", data: req.body});
            return;
        }
        
        //if all values are provided then data is entered into the model
        const character_details = await Character.create({
          name: name,
          age: age,
          photos: photos,
          gender: gender,
          occupation: occupation,
          relations: []
      })
      
      //if we have successfully entered details into character schema then success message is generated
      await res.status(200).send({success:true,message:"CHARACTER DETAILS ENTERED" ,data :character_details})
    }
    catch (error) {
      
      //if some error is encountered during character schema entrance then error message is generated
      // console.log(error)
      res.status(200).send({success:false,message :"ERROR IN CHARACTER DETAILS CREATION" , data : error})
    }
    finally {
      //database is closed after it has been used
      await mongoose.disconnect();
      // console.log('Disconnected from the database')
    }
}