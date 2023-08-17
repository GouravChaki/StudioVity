const Relation = require("../../database/db_schemas/user_schemas/relation_schema");
const mongoose = require("mongoose");
const connect_to_mongo = require("../../database/db_create/connectdb");
const Character = require("../../database/db_schemas/user_schemas/character_schema");

module.exports = async (req, res) => {
  try {
    await connect_to_mongo(); //calling the mongodb function for establishing connection

    //extracting user details from request
    const { name, description, character_id1, character_id2 } = req.body;

    if (!name || !description || !character_id1 || !character_id2) {
      //checks whether all the required values are provided or not
      res
        .status(200)
        .send({ success: false, message: "VALUE MISSING", data: req.body });
      return;
    }

    //extracting values of character1 and character2
    const character1 = await Character.findById(character_id1);
    const character2 = await Character.findById(character_id2);

    //check condition used to check whether character1 or character2 exists
    if (!character1 || !character2) {
      res
        .status(200)
        .send({
          success: false,
          message: "NO CHARACTER DATAS EXISTS WITH THE GIVEN CHARACTER IDS",
          data: req.body,
        });
      return;
    }

    //to check whether relation with character1 id same as given character_id1 exists or character2 id same as given character_id2
    const relation_exists = await Relation.findOne({
      $or: [
        {
          character1: character_id1,
          character2: { $in: [character_id2] },
          name: name,
        },
        {
          character1: character_id2,
          character2: { $in: [character_id1] },
          name: name,
        },
      ],
    });

    //if similar relation exists then error message is generated
    if(relation_exists) {
      res
        .status(200)
        .send({
          success: false,
          message: "RELATION ALREADY EXISTS",
          data: req.body,
        });
      return;
    }
    
    //if relation with same character1 id and name exists
    const relation= await Relation.findOne({
      character1: character_id1,
      name: name
    })

    if(relation)// user with character1 and name configurations exists in relation
    {
      relation.character2.push(character_id2); //push the character2 details into the character2 attribute of the user
      await relation.save(); //save the relation
    //if we have successfully entered details into relation schema then success message is generated

    //saving the simultaneous character details in respective character schemas
    character2.relations.push(relation._id)
    await character2.save();

    await res
      .status(200)
      .send({
        success: true,
        message: "RELATION DETAILS UPDATED",
        data: relation,
      });
    }
    
    else//create a new relation entry with the given details
    {
      const relation_details = await Relation.create({
        name: name,
        description: description,
        character1:character_id1,
        character2:[character_id2]
      });

          //saving the simultaneous character details in respective character schemas
          character1.relations.push(relation_details._id)
          character2.relations.push(relation_details._id)
          await character1.save();
          await character2.save();

    //if we have successfully entered details into relation schema then success message is generated
    await res
      .status(200)
      .send({
        success: true,
        message: "RELATION DETAILS ENTERED",
        data: relation_details,
      });
    }
  } catch (error) {
    //if some error is encountered during relation schema entrance then error message is generated
    // console.log(error)
    res
      .status(200)
      .send({
        success: false,
        message: "ERROR IN RELATION DETAILS CREATION",
        data: error,
      });
  } finally {
    //database is closed after it has been used
    await mongoose.disconnect();
    // console.log('Disconnected from the database')
  }
};
