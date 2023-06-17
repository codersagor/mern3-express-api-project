const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ msg: "Connected, Server Started" })
})

module.exports = router;