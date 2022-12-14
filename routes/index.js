var express = require("express");
const { Add, FindAll, Delete } = require("../controllers/Images.controllers");
var router = express.Router();
router.post("/upload", Add);
router.get("/upload", FindAll);
router.delete("/upload/:id", Delete);

module.exports = router;
