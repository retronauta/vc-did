const express = require("express");
const { createDID } = require("../controllers/ion.controllers");
const router = express.Router();

router.use("/create", createDID);

module.exports = router;
