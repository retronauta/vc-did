const authenticity = require("@transmute/verifiable-credentials");
const ed2519 = require("@transmute/did-key-ed25519");
const crypto = require("crypto");
// const keyToDidDoc = require("@transmute/did-key-common");
const didMethodKey = require("did-method-key");
const { keyToDidDoc } = didMethodKey.driver();

const vcTransmute = async () => {
  const [verifiableCredential] = await authenticity.v1.credential.proof.secure({
    credential: {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
          "@vocab": "https://brand.example/vocab#",
        },
      ],
      type: ["VerifiableCredential"],
      issuer: {
        id: "did:example:123",
      },
      issuanceDate: "2022-09-24T16:31:40.815Z",
      credentialSubject: {
        id: "did:example:456",
      },
    },
    privateKey: {
      kid: "urn:ietf:params:oauth:jwk-thumbprint:sha-256:d6Sn5q-KOIjK2e5pHHvotvAFEAoNif2RFkWASut2TtE",
      kty: "EC",
      crv: "P-256",
      alg: "ES256",
      x: "LLYP8HXfs4J4PmwMtELoR6JI8vDaKgtwEIchwo49IXk",
      y: "jvI53P21wE4B33qEFDpOnwRRMSmSyIUX79sexOop45g",
      d: "T0YeaounhR36mctdPbDHxw9P3qAicekqeeTIsPTIhng",
    },
  });

  return verifiableCredential;
};

const keysTransmute = async () => {
  const seed = crypto.randomBytes(32).toString("hex");
  let key = await ed2519.generate({
    secureRandom: () => {
      return Buffer.from(seed, "hex");
    },
  });
  // const didDoc = await keyToDidDoc(key);
  // return didDoc;
  return key
};

const createDidDoc = async () => {
  try {
    const didDoc = await keyToDidDoc(ed25519Key);
    return didDoc;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vcTransmute, keysTransmute, createDidDoc };
