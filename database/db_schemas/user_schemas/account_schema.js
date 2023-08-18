const mongoose = require('mongoose');

//to create a new schema named characterSchema
const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true,
    unique: true
  },
  token:{
    type:String
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

//to create a mongo model using this characterSchema
const Account = mongoose.model('Account', AccountSchema);

module.exports = Account