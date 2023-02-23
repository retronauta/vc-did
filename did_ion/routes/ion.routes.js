const express = require("express");
const { generateKeys, issueDID } = require("../controllers/ion.controllers");
const router = express.Router();

router.use("/generateKeys", generateKeys);
router.use("/createDID", issueDID);

module.exports = router;
