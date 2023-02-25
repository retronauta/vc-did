const { writeFile, readFile } = require("fs/promises");
const ION = require("@decentralized-identity/ion-tools");
const fs = require("fs");

const generateAndSaveKeys = async () => {
  try {
    const authKeys = await ION.generateKeyPair("Ed25519");
    await writeFile("./keys.json", JSON.stringify(authKeys));
    console.log("Writing private keys to keys.json");
    return authKeys;
  } catch (error) {
    console.log(error.message);
  }
};

const createDID = async () => {
  try {
    fs.open("./keys.json", "r", (err, fd) => {
      if (err) {
        return "No existe el archivo";
      }
    });

    let publicKeys2 = await readFile("./keys.json", "utf-8");
    const public = JSON.parse(publicKeys2);

    let did = new ION.DID({
      content: {
        publicKeys: [
          {
            id: "key-1",
            type: "Ed25519VerificationKey2020",
            publicKeyJwk: public,
            purposes: ["authentication"],
          },
        ],
        services: [
          {
            id: "domain-1",
            type: "LinkedDomains",
            serviceEndpoint: "https://constata.eu/",
          },
        ],
      },
    });

    const uri = await did.getURI();
    const shortUri = await did.getURI("short");
    let createRequest = await did.generateRequest(0);
    let anchorResponse = await ION.anchor(createRequest);
    let ionOps = await did.getAllOperations();
    await writeFile("./did.json", anchorResponse);
    await writeFile("./uris.json", JSON.stringify({ uri, shortUri }));
    await writeFile("./ionOps.json", JSON.stringify(ionOps));
    return { shortUri, uri, anchorResponse, ionOps };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { generateAndSaveKeys, createDID };
