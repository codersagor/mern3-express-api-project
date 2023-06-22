const app = require('./app');
require('dotenv').config({ path: "./config.env" });
const port = process.env.PORT || 8080;


// Default Error Handler
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({error : err});
}
app.use(errorHandler)

// Listen the server on
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}                                                                                                                               `)
})