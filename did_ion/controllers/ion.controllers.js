const { generateAndSaveKeys, createDID } = require("../services/ion.services");
const { writeFile } = require("fs/promises");

const generateKeys = async (req, res) => {
  try {
    let keys = await generateAndSaveKeys();
    await writeFile("./keys.json", JSON.stringify(keys));
    console.log("Wrote private key to keys.json");
    res.status(200).send({ keys });
  } catch (error) {
    console.log(error.message);
  }
};

const issueDID = async (req, res) => {
  try {
    const { shortUri, uri, anchorResponse, ionOps } = await createDID();
    const uris = { shortUri, uri };
    await writeFile("./did.json", anchorResponse);
    await writeFile("./uris.json", JSON.stringify(uris));
    await writeFile("./ionOps.json", JSON.stringify(ionOps));
    res.send({ mesage: "Created and saved did" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { generateKeys, issueDID };
