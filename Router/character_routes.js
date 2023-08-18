const express = require('express');
const router = express.Router();
const create_character=require('../Modules/characters/create_character');
const read_character = require('../Modules/characters/read_character');
const fetch_all_characters = require('../Modules/characters/fetch_all_characters');
const update_character = require('../Modules/characters/update_character');
const delete_character = require('../Modules/characters/delete_character');
const authenticate = require('../JWT/authenticate');

router.post('/createCharacter',authenticate,create_character);//createcharacter route will create/enter character_details

router.post('/fetchCharacter',authenticate, read_character);//fetchCharacter route will fetch character_details

router.post('/fetchAllCharacter',authenticate, fetch_all_characters);//fetchAllCharacter route will fetch all the character_details from the database

router.post('/updateCharacter',authenticate, update_character);//updateCharacter route will update all the character_details from the database

router.post('/deleteCharacter',authenticate, delete_character);//deleteCharacter route will delete all the character_details from the database for the given id

module.exports = router;