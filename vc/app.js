import {vc} from "@digitalbazaar/vc";

// Required to set up a suite instance with private key
import { Ed25519VerificationKey2020 } from "@digitalbazaar/ed25519-verification-key-2020";
import { Ed25519Signature2020 } from "@digitalbazaar/ed25519-signature-2020";

import { Ed25519VerificationKey2018 } from "@digitalbazaar/ed25519-verification-key-2018";

const generateKeys2020 = async () => {
  const keyPair = await Ed25519VerificationKey2020.generate();
  const suite = new Ed25519Signature2020({ key: keyPair });
  console.log({ keyPair, suite });
};

generateKeys2020()

// Sample unsigned credential
const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1",
  ],
  id: "https://example.com/credentials/1872",
  type: ["VerifiableCredential", "AlumniCredential"],
  issuer: "https://example.edu/issuers/565049",
  issuanceDate: "2010-01-01T19:23:24Z",
  credentialSubject: {
    id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
    alumniOf: "Example University",
  },
};

// const generateKeys2018 = async () => {
//   const keyPair = await Ed25519VerificationKey2018.generate();
//   console.log({ keyPair2018: keyPair });
// };

// generateKeys2018();
// const signedVC = await vc.issue({ credential, suite, documentLoader });
