const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const connect_to_mongo=require('../../database/db_create/connectdb');
const Account = require('../../database/db_schemas/user_schemas/account_schema');
const accesstoken = require('../../JWT/accesstoken');

module.exports= async (req, res) => {
    try {
      
        await connect_to_mongo();//calling the mongodb function for establishing connection

        //extracting user details from request
        const {name, email,password}=req.body;
        
        if(!name || !email || !password)//if given values are null
        {
            res.status(200).send({success:false,message:"VALUE MISSING", data: req.body});
            return;
        }
        
        const account=await Account.findOne({
            email:email
        })

        if(account){
            res.status(200).send({success:false,message:"ACCOUNT WITH SAME EMAIL ID ALREADY EXISTS", data: req.body});
            return;
        }

        const salt=await bcrypt.genSalt(10)//to generate a salt of size 10

        const hashed_pass=await bcrypt.hash(password,salt)// to hash password using salt

        const token=await accesstoken(email,password)//to retrieve the token from AccessToken module
        
        //if all values are provided then data is entered into the model
        const account_details = await Account.create({
          name: name,
          email: email,
          password: hashed_pass,
          token:token
      })
      //if we have successfully entered details into account schema then success message is generated
      await res.status(200).send({success:true,message:"ACCOUNT DETAILS ENTERED" ,data :account_details})
    }

    catch (error) {  
      //if some error is encountered during account schema entrance then error message is generated
      console.log(error)
      res.status(200).send({success:false,message :"ERROR IN ACCOUNT DETAILS CREATION" , data : error})
    }
    finally {
      //database is closed after it has been used
      await mongoose.disconnect();
      // console.log('Disconnected from the database')
    }
}