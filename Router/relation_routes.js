const express = require('express');
const router = express.Router();
const create_relation=require('../controllers/relations/create_relations');

router.post('/createRelation', create_relation);//createRelation route will create/enter relation_details

module.exports = router;