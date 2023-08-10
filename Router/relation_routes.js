const express = require('express');
const router = express.Router();
const create_relation=require('../Modules/relations/create_relations');
const read_relations = require('../Modules/relations/read_relations');

router.post('/createRelation', create_relation);//createRelation route will create/enter relation_details

router.post('/fetchRelation', read_relations);//fetchCharacter route will fetch relation_details

module.exports = router;