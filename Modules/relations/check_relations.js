const Character = require("../../database/db_schemas/user_schemas/character_schema");
const Relation = require("../../database/db_schemas/user_schemas/relation_schema");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  //extracting user details from request
  const { id, character1, character2 } = req.body;

  //check for character 1
  const relation = await Relation.findById(id);

  //existing details of character1 and character2
  const prev_character1 = relation.character1;

  //delete all the relation ids from characters linked to it
  const character1_replace = await Character.findById(prev_character1.toString());
  character1_replace.relations.pull(relation._id);
  await character1_replace.save();

  //to get the replaced character
  const character2_replace = await Character.find({
    _id: {
      $in: relation.character2.map(id => new mongoose.Types.ObjectId(id))
    }
  })

  await Promise.all(
    character2_replace.map(async (x) => {
      x.relations.pull(relation._id)
      await x.save();
    }))

  //add all the relation ids from characters linked to it
  const character1_add = await Character.findById(character1);
  character1_add.relations.push(relation._id);
  await character1_add.save();

  //to find the characters with the given id
  const character2_add = await Character.find({
    _id: {
      $in: character2.map(id => new mongoose.Types.ObjectId(id))
    }
  })

  await Promise.all(
    character2_add.map(async (x) => {
      x.relations.push(relation._id)
      await x.save();
    }))
};
