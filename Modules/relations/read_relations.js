const mongoose = require('mongoose');
const connect_to_mongo=require('../../database/db_create/connectdb');
const Relation = require('../../database/db_schemas/user_schemas/relation_schema');

module.exports= async (req, res) => {
    try {
        
        await connect_to_mongo();//calling the mongodb function for establishing connection

        //extracting id from request
        const {id}=req.body;
        
        if(!id)//if relation exists it will simply return with an error that credentials exists
        {
            res.status(200).send({success:false,message:"RELATION ID NOT PROVIDED", data: req.body});
            return;
        }
        
        const relation = await Relation.findById(id);

        if(!relation)
        {
            res.status(200).send({success:false,message:"RELATION DOESN'T EXISTS", data: req.body});
            return;
        }
      
      //if we have successfully fetched details then success message is generated
      await res.status(200).send({success:true,message:"RELATION DETAILS :" ,data :relation});
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