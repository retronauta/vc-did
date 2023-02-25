const express = require("express");
const { generateKeys, issueDID } = require("../controllers/ion.controllers");
const router = express.Router();

router.get("/generateKeys", generateKeys);
router.get("/createDID", issueDID);


module.exports = router;
