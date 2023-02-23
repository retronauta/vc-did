const ION = require("@decentralized-identity/ion-tools");
const publicKey = require("../keys.json").publicJwk;

const generateAndSaveKeys = async () => {
  try {
    const authKeys = await ION.generateKeyPair();
    return authKeys;
  } catch (error) {
    console.log(error.message);
  }
};

const createDID = async () => {
  try {
    if (!publicKey) return undefined;
    let did = new ION.DID({
      content: {
        publicKeys: [
          {
            id: "key-1",
            type: "EcdsaSecp256k1VerificationKey2019",
            publicKeyJwk: publicKey,
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
    return { shortUri, uri, anchorResponse, ionOps };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { generateAndSaveKeys, createDID };
