const Relation = require('../../database/db_schemas/user_schemas/relation_schema');
const mongoose = require('mongoose');
const connect_to_mongo=require('../../database/db_create/connectdb')

module.exports= async (req, res) => {
    try {
      
        await connect_to_mongo();//calling the mongodb function for establishing connection

        //extracting user details from request
        const {name, description}=req.body;
        
        if(!name || !description)//checks whether all the required values are provided or not
        {
            res.status(200).send({success:false,message:"VALUE MISSING", data: req.body});
            return;
        }

        //if all values are provided then data is entered into the model
        const relation_details = await Relation.create({
          name: name,
          description: description
      })
      
      //if we have successfully entered details into relation schema then success message is generated
      await res.status(200).send({success:true,message:"RELATION DETAILS ENTERED" ,data :relation_details})
    }
    catch (error) {
      
      //if some error is encountered during relation schema entrance then error message is generated
      // console.log(error)
      res.status(200).send({success:false,message :"ERROR IN RELATION DETAILS CREATION" , data : error})
    }
    finally {

      //database is closed after it has been used
      await mongoose.disconnect();
      // console.log('Disconnected from the database')
    }
}