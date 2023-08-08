const express = require('express');
const router = express.Router();
const create_character=require('../controllers/characters/create_character');
const read_character = require('../controllers/characters/read_character');

router.post('/createCharacter', create_character);//createcharacter route will create/enter character_details

router.post('/fetchCharacter', read_character);//fetchCharacter route will fetch character_details

module.exports = router;