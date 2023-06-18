const express = require('express');
const {home} = require('../controllers/file');
const { registration } = require('../controllers/userControler');
const router = express.Router();

router.get('/', home);
router.get('/home', home);
router.get('/registrations', registration)

module.exports = router;