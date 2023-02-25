const { writeFile, readFile } = require("fs/promises");
const ION = require("@decentralized-identity/ion-tools");
const fs = require("fs");

const generateAndSaveKeys = async () => {
  try {
    const authKeys = await ION.generateKeyPair("Ed25519");
    const namePublicKey = authKeys.publicJwk.x;
    fs.mkdirSync(`./vcs/keys/${namePublicKey}`);
    await writeFile(
      `./vcs/keys/${namePublicKey}/${namePublicKey}.json`,
      JSON.stringify(authKeys)
    );
    console.log("Writing private keys to keys.json");
    return authKeys;
  } catch (error) {
    console.log(error.message);
  }
};

const createDID = async public => {
  try {
    // fs.open("./keys.json", "r", (err, fd) => {
    //   if (err) {
    //     return "No existe el archivo";
    //   }
    // });

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
    fs.mkdirSync(`./vcs/dids/${shortUri}`);
    await writeFile(`./vcs/dids/${shortUri}/did-${shortUri}`, anchorResponse);
    await writeFile(
      `./vcs/dids/${shortUri}/uris-${shortUri}`,
      JSON.stringify({ uri, shortUri })
    );
    await writeFile(
      `./vcs/dids/${shortUri}/ops-${shortUri}`,
      JSON.stringify(ionOps)
    );
    return { shortUri, uri, anchorResponse, ionOps };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateAndSaveKeys, createDID };
