const mongoose = require('mongoose');
const Relation=require('./relation_schema')

//to create a new schema named characterSchema
const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
	photos: {
    type: Array,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  relations: [{
    type: mongoose.Schema.Types.ObjectId, //to establish foreign key relation between characterSchema and relationSchema
    ref: 'Relation'
  }]
});

//to create a mongo model using this characterSchema
const Character = mongoose.model('Character', characterSchema);

module.exports = Character