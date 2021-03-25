const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
	res.sendFile(process.cwd() + '/views/robolab/competicao.html');
});

module.exports = router;
