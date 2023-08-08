const mongoose = require('mongoose');

//to create a new schema named relationSchema
const relationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

  
  const Relation = mongoose.model('Relation', relationSchema);

  module.exports = Relation;