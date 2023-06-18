const app = require('./app');
require('dotenv').config({ path: "./config.env" });
const port = process.env.PORT || 8080;


// Listen the server on
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}                                                                                                                               `)
})