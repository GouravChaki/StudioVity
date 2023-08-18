const Character = require("../../database/db_schemas/user_schemas/character_schema");
const Relation = require("../../database/db_schemas/user_schemas/relation_schema");
const mongoose = require("mongoose");
const connect_to_mongo = require("../../database/db_create/connectdb");

module.exports = async (req, res) => {
  try {
    await connect_to_mongo(); //calling the mongodb function for establishing connection

    //extracting user details from request
    const { id, character1,character2 } = req.body;

    //check for character 1
    const relation= await Relation.findById(id);
    if(relation.character1!==character1){
        const char_x= await Character.updateOne(
          {_id:relation.character1},
          {
            $pull:{
              $in:{ relations: id}
            }
          }
        );
        const char_update= await Character.findById(character1);
        char_update.relations.push(id);
    }
    
    //characters which are currently present in the relation
    relation.character2.map((x)=>{

      //characters which are provided by the user
      character2.map((y)=>{
        
        //if it is a new character
        if(y!==x){
        }
      })
    })
    
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
