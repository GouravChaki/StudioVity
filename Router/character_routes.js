const express = require('express');
const router = express.Router();
const create_character=require('../Modules/characters/create_character');
const read_character = require('../Modules/characters/read_character');
const fetch_all_characters = require('../Modules/characters/fetch_all_characters');

router.post('/createCharacter', create_character);//createcharacter route will create/enter character_details

router.post('/fetchCharacter', read_character);//fetchCharacter route will fetch character_details

router.post('/fetchAllCharacters', fetch_all_characters);//fetchAllCharacters route will fetch all the character_details from the database

module.exports = router;