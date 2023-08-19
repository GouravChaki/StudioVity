const Character = require("../../database/db_schemas/user_schemas/character_schema");
const Relation = require("../../database/db_schemas/user_schemas/relation_schema");
const mongoose = require("mongoose");
const connect_to_mongo = require("../../database/db_create/connectdb");

module.exports = async (req, res) => {
  try {
    await connect_to_mongo(); //calling the mongodb function for establishing connection

    //extracting user details from request
    const { id, name, age, photos, gender, occupation } = req.body;

    if (!id) {
      //if id not provided then update can't be performed
      res
        .status(200)
        .send({ success: false, message: "VALUE MISSING", data: req.body });
      return;
    }

    const character_prev = await Character.findById(id); // to find the previous character details from database

    if (!character_prev) {
      //if no character exists with the given character id
      await res.status(200).send({
        success: false,
        message: "CHARACTER DETAILS DOESN'T EXIST WITH THE GIVEN ID",
        data: req.body,
      });
      return;
    }
    //if all values are provided then data is entered into the model
    const character_details = await Character.updateOne(
      { _id: id },
      {
        $set: {
          name: name || character_prev.name,
          age: age || character_prev.age,
          photos: photos || character_prev.photos,
          gender: gender || character_prev.gender,
          occupation: occupation || character_prev.occupation,
          relations: character_prev.relations,
        },
      }
    );

    //if we have successfully entered details into character schema then success message is generated
    await res.status(200).send({
      success: true,
      message: "CHARACTER DETAILS UPDATED SUCCESSFULLY",
      data: character_details,
    });
  } catch (error) {
    //if some error is encountered during character schema entrance then error message is generated
    console.log(error);
    res.status(200).send({
      success: false,
      message: "ERROR IN CHARACTER DETAILS UPDATION",
      data: error,
    });
  } finally {
    //database is closed after it has been used
    await mongoose.disconnect();
    // console.log('Disconnected from the database')
  }
};
