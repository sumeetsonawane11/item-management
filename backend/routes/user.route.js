const express = require('express')
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/signup', UserController.CreateUser);

router.post('/login', UserController.LoginUser);

module.exports = router;