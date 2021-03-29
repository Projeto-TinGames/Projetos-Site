const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/views/tingames/Cursos.html');
 });

module.exports = router;