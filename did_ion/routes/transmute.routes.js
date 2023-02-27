const express = require("express");
const {
  issueTransmuteVc,
  genKeysTransmute,
  didDoc,
} = require("../controllers/transmute.controller");
const router = express.Router();

router.get("/vc", issueTransmuteVc);
router.get("/keys", genKeysTransmute);
router.get("/didDoc", didDoc);

module.exports = router;
