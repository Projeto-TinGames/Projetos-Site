const express = require("express");
const router = express.Router();

router.get('/jvSG@v9Z/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Ano64.html');
});

module.exports = router;