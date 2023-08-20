const express = require('express');
const router = express.Router();
const authenticate = require('../JWT/authenticate');
const fetch_report = require('../Modules/character_report/fetch_report');

router.post('/fetchReport',authenticate,fetch_report); // to  fetch the character report of all the characters

module.exports = router;