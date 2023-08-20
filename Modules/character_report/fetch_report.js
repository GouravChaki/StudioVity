const Character = require("../../database/db_schemas/user_schemas/character_schema");
const mongoose = require("mongoose");
const connect_to_mongo = require("../../database/db_create/connectdb");
const pdf_report = require("./pdf/pdf_report");

module.exports = async (req, res) => {
  try {
    await connect_to_mongo(); //calling the mongodb function for establishing connection

    //extracting id from request
    const { type } = req.body;

    if (!type) {
      //if type is  not provided
      res
        .status(200)
        .send({ success: false, message: "TYPE NOT PROVIDED", data: req.body });
      return;
    }

    const character = await Character.find({});

    if (!character) {
      res
        .status(200)
        .send({
          success: false,
          message: "CHARACTER DOESN'T EXISTS",
          data: req.body,
        });
      return;
    }

    if (type === "pdf") {
      //to receive the pdf buffer format from pdf_report file
      const pdf = await pdf_report(character);

      //if we have successfully fetched details then success message is generated
      await res.setHeader("Content-Type", "application/pdf");
      await res.status(200).send(pdf);
      return;
    } else if (type === "excel") {
    } else if (type === "csv") {
      s;
    } else {
      res
        .status(200)
        .send({
          success: false,
          message: "WRONG TYPE ID PROVIDED",
          data: req.body,
        });
      return;
    }
  } catch (error) {
    //if some error is encountered during character schema fetching then error message is generated
    res
      .status(200)
      .send({
        success: false,
        message: "ERROR IN CHARACTER DETAILS FETCHING",
        data: error,
      });
  } finally {
    //database is closed after it has been used
    await mongoose.disconnect();
    // console.log('Disconnected from the database')
  }
};
