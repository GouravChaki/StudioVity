const express = require('express');
const router = express.Router();
const create_relation=require('../Modules/relations/create_relations');
const read_relations = require('../Modules/relations/read_relations');
const fetch_all_relations = require('../Modules/relations/fetch_all_relations');
const update_relations = require('../Modules/relations/update_relations');
const delete_relations = require('../Modules/relations/delete_relations');

router.post('/createRelation', create_relation);//createRelation route will create/enter relation_details

router.post('/fetchRelation', read_relations);//fetchCharacter route will fetch relation_details

router.post('/fetchAllRelations', fetch_all_relations);//fetchAllRelations route will fetch all the relation_details from the database

router.post('/updateRelations', update_relations);//updateRelations route will update all the relation_details from the database

router.post('/deleteRelations', delete_relations);//deleteRelations route will delete all the relation_details from the database for the given id

module.exports = router;