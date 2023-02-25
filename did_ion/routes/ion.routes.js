const express = require("express");
const {
  generateKeys,
  issueDID,
  readKeys,
} = require("../controllers/ion.controllers");
const { publicKey } = require("../services/ion.services");
const router = express.Router();

router.get("/generateKeys", generateKeys);
router.get("/createDID", issueDID);
router.get("/readKeys", readKeys);

module.exports = router;
