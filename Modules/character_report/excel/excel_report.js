const exceljs = require("exceljs");

module.exports = async (characters) => {
    
    // to create a workbook of excel
  const workbook = new exceljs.Workbook();

  //adding a sheet to that workbook named characters
  const worksheet = workbook.addWorksheet("Characters");

  // Add header row 
  worksheet.addRow(["Name", "Age", "Gender", "Occupation", "Linked Relations (IDs)","Photos"]);

  // Populate the worksheet with character data
  characters.forEach((char) => {
    worksheet.addRow([
      char.name,
      char.age,
      char.gender,
      char.occupation,
      char.relations.join(", "),
      char.photos.join(", ")
    ]);
  });

  //writes the content in a buffer in excel sheet format
  const excelBuffer = workbook.xlsx.writeBuffer();

  return excelBuffer;
};
