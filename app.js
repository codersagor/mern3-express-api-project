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

// Implement all  Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser)
app.use(cors())
app.use(bodyParser.json());
app.use(helmet())
app.use(mongoSanitize())

// http Limiter
const limiter = rateLimiter({ windowms: 15 * 60 * 1000, max: 100 })
app.use(limiter);


app.use(route)
module.exports = app;