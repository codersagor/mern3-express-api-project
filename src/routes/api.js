const express = require('express');
const {home} = require('../controllers/file');
const { registration, login,profileDetails, sendOtp} = require('../controllers/userControler');
const authVerifyMiddleware = require('../middlewares/AuthVeriyMiddleware')
const router = express.Router();

router.get('/', home);
router.get('/home', home);
router.post('/registration', registration);
router.post('/login', login);
router.get("/sendotp", sendOtp);

// After Login routes
router.get('/user', authVerifyMiddleware, profileDetails);

module.exports = router;