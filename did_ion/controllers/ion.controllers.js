const { generateAndSaveKeys, createDID } = require("../services/ion.services");
const fs = require("fs");

const generateKeys = async (req, res) => {
  try {
    let keys = await generateAndSaveKeys();
    res.status(201).send({ keys });
  } catch (error) {
    console.log(error.message);
    res.end();
  }
};

const issueDID = async (req, res) => {
  try {
    const { publicJwk } = req.body;
    const { shortUri, uri, anchorResponse } = await createDID(publicJwk);
    const uris = { shortUri, uri };
    res.send({
      mesage: "Created and saved did",
      uris,
      DID: JSON.parse(anchorResponse),
    });
  } catch (error) {
    console.log(error.message);
    res.end();
  }
};

const readKeys = async (req, res) => {
  try {
    let keys = fs.readFileSync("./keys.json", "utf-8");
    res.send(keys);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { generateKeys, issueDID, readKeys };
