const express = require('express');
const router = express.Router();
const create_relation=require('../Modules/relations/create_relations');
const read_relations = require('../Modules/relations/read_relations');
const fetch_all_relations = require('../Modules/relations/fetch_all_relations');
const update_relations = require('../Modules/relations/update_relations');
const delete_relations = require('../Modules/relations/delete_relations');
const authenticate = require('../JWT/authenticate');

router.post('/createRelation',authenticate, create_relation);//createRelation route will create/enter relation_details

router.post('/fetchRelation',authenticate, read_relations);//fetchRelation route will fetch relation_details

router.post('/fetchAllRelation',authenticate, fetch_all_relations);//fetchAllRelation route will fetch all the relation_details from the database

router.post('/updateRelation',authenticate, update_relations);//updateRelation route will update all the relation_details from the database

router.post('/deleteRelation',authenticate, delete_relations);//deleteRelation route will delete all the relation_details from the database for the given id

module.exports = router;