const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/InovaLab/galeria.html");
 });

module.exports = router;