require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey=process.env.SecretKey; // Retrieving the Secret Key from environment
const bcrypt = require('bcrypt');

module.exports=async(email,password)=>{

    //to generate access token with a particular expiry time
    const token=jwt.sign({email:email,password:password},secretKey,{ expiresIn: '2m' })
    return token
 }