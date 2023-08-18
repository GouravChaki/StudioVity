const express = require('express');
const create_account = require('../Modules/account/create_account');
const login_account = require('../Modules/account/login_account');
const router = express.Router();

router.post('/createAccount', create_account);//createAccount route will create/enter account details

router.post('/loginAccount', login_account);//loginAccount route will login account details

module.exports = router;