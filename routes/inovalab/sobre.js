const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/views/InovaLab/sobre.html");
 });

module.exports = router;