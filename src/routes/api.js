const express = require('express');
const {home} = require('../controllers/file');
const { registration } = require('../controllers/userControler');
const router = express.Router();

router.get('/', home);
router.get('/home', home);
router.post('/registration', registration)

module.exports = router;