const express = require('express');
const route = require('./src/routes/api');
const app = new express();


// All middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// Security Middlewares
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');


module.exports= app;