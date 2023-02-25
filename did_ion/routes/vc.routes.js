const express = require("express");
const { createUnsignedVC } = require("../controllers/vc.controllers");
const router = express.Router();

router.post("/unsignedVC", createUnsignedVC);

module.exports = router;
