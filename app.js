const express = require('express');
const router = require("./src/routes/api");
const app = new express();
require('dotenv').config({ path: "./config.env" });




// All middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

// Security Middleware import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

// All Middlewares use
app.use(express.static('public'))
app.use(bodyParser.json())

// Security Middlewares use
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// Request rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter)

// Database Connection Mongoose
const dbUri = process.env.DB_URI;
const dbConnectOptions = {
    user: "",
    pass: "",
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbUri, dbConnectOptions)
    .then(()=> {
        console.log("Database Connected")
    })
    .catch((err) => {
        console.log(`Database connection failed, err: ${err}`)
    });

app.use('/api/v1', router);

app.use("*", (req, res) => {
    res.status(404).json({msg: "Page not founded"})
});

module.exports = app;