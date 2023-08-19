const Character = require("../../database/db_schemas/user_schemas/character_schema");
const Relation = require("../../database/db_schemas/user_schemas/relation_schema");
const mongoose = require("mongoose");
const connect_to_mongo = require("../../database/db_create/connectdb");
const check_relations = require("./check_relations");

module.exports = async (req, res) => {
  try {
    await connect_to_mongo(); //calling the mongodb function for establishing connection

    //extracting user details from request
    const { id, name, description, character1, character2 } = req.body;

    if (!id) {
      //if id not provided then update can't be performed
      res
        .status(200)
        .send({ success: false, message: "VALUE MISSING", data: req.body });
      return;
    }


    const relation_prev = await Relation.findById(id); // to find the previous relation details from database

    if (!relation_prev) {
      //if no relation exists with the given relation id
      await res
        .status(200)
        .send({
          success: false,
          message: "RELATION DETAILS DOESN'T EXIST WITH THE GIVEN ID",
          data: req.body,
        });
      return;
    }
    const characterIds = [character1, ...character2].map(id => new mongoose.Types.ObjectId(id));
    if (character1 || character2) {
      const character_exists = await Character.find({
        _id: {
          $in: characterIds
        }
      });

      if (!character_exists) {
        await res
          .status(200)
          .send({
            success: false,
            message: "WRONG CHARACTER IDS PROVIDED",
            data: req.body
          });
      }
    }

    //to make changes in character schemas w.r.t the character ids provided
    await check_relations(req, res);

    //after making all the changes through check relation function, relation details are finally updated
    //if all values are provided then data is entered into the model
    const relation_details = await Relation.updateOne(
      { _id: id },
      {
        $set: {
          name: name || relation_prev.name,
          description: description || relation_prev.description,
          character1: character1,
          character2: character2
        },
      }
    );

    //if we have successfully entered details into relation schema then success message is generated
    await res
      .status(200)
      .send({
        success: true,
        message: "RELATION DETAILS UPDATED SUCCESSFULLY",
        data: relation_details,
      });
  } catch (error) {
    //if some error is encountered during relation schema entrance then error message is generated
    console.log(error);
    res
      .status(200)
      .send({
        success: false,
        message: "ERROR IN RELATION DETAILS UPDATION",
        data: error,
      });
  } finally {
    //database is closed after it has been used
    await mongoose.disconnect();
    // console.log('Disconnected from the database')
  }
};
