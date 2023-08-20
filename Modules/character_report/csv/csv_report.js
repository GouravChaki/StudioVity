const fs = require('fs');

module.exports= async (characters) => {

    //to add characters in the specified format
  const csvData = characters.map(char => `${char.name},${char.age},${char.gender},${char.occupation},${char.relations.join('|')},${char.photos.join('|')}`);
  const csvContent = 'Name,Age,Gender,Occupation,Linked Relation (IDs),Photos\n' + csvData.join('\n');

  return csvContent;
}
