const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + "/Views/InovaLab/recursos.html");
 });

module.exports = router;