const Character = require("../../database/db_schemas/user_schemas/character_schema");
const Relation = require("../../database/db_schemas/user_schemas/relation_schema");
const mongoose = require("mongoose");
const connect_to_mongo = require("../../database/db_create/connectdb");

module.exports = async (req, res) => {
  try {
    await connect_to_mongo(); //calling the mongodb function for establishing connection

    //extracting user details from request
    const { id } = req.body;

    if (!id) {
      //if id not provided then update can't be performed
      res
        .status(200)
        .send({ success: false, message: "VALUE MISSING", data: req.body });
      return;
    }

    const relation = await Relation.findById(id);

    if (!relation) {
      //if relation schema is empty
      await res
        .status(200)
        .send({
          success: false,
          message: "NO RELATION DETAILS EXIST WITH THE GIVEN ID :",
          data: req.body,
        });
        return;
    }

    //delete relation ids to the characters related to it

    //delete relation id from character1
    if (relation.character1) {
      var character1 = await Character.findById(relation.character1);
      character1.relations.pull(id);
      await character1.save();
    }

    //delete relation id from all character2 ids
    if (relation.character2) {
      const character2_all = await Character.find({
        _id: {
          $in: relation.character2.map((id) => new mongoose.Types.ObjectId(id)),
        },
      });

      //to remove this relation id from every character id matching character schema's relation field
      await Promise.all(
        character2_all.map(async (x) => {
          x.relations.pull(id);
          await x.save();
        })
      );
    }

    //to delete the relation with the given id
    const deleted_relation = await Relation.deleteOne({ _id: id });

    //if we have successfully deleted details from relation schema then success message is generated
    await res
      .status(200)
      .send({
        success: true,
        message: "RELATION DETAILS DELETED SUCCESSFULLY",
        data: deleted_relation,
      });
  } catch (error) {
    //if some error is encountered during relation schema deletion then error message is generated
    console.log(error);
    res
      .status(200)
      .send({
        success: false,
        message: "ERROR IN RELATION DETAILS DELETION",
        data: error,
      });
  } finally {
    //database is closed after it has been used
    await mongoose.disconnect();
    // console.log('Disconnected from the database')
  }
};
