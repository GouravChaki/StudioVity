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
    },
    character1:{
      type: mongoose.Schema.Types.ObjectId, //to establish foreign key relation between characterSchema and relationSchema
      ref: 'Character'
    },
    character2: [{
      type: mongoose.Schema.Types.ObjectId, //to establish foreign key relation between characterSchema and relationSchema
      ref: 'Character'
    }]
  });

  
  const Relation = mongoose.model('Relation', relationSchema);

  module.exports = Relation;