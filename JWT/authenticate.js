require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey=process.env.SecretKey; // Retrieving the Secret Keu from environment

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  try{
    const data=jwt.verify(token,secretKey);
    
    //if the token has not expired and exists
    if (data) {

      //middleware goes to the next function
      next();
    } 
    else {
      res
        .status(401)
        .send({ success: false, message: "TOKEN EXPIRED" });
    }
  } catch (err) {
    res.status(200).send({success:false,message:'ERROR IN AUTHENTICATION',error:err});
    return;  
}
};

module.exports = authenticate;

