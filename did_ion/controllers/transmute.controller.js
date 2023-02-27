const {
  vcTransmute,
  keysTransmute,
  createDidDoc,
} = require("../services/transmute.services");

const issueTransmuteVc = async (req, res) => {
  try {
    const result = await vcTransmute();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const genKeysTransmute = async (req, res) => {
  try {
    const result = await keysTransmute();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const didDoc = async (req, res) => {
  try {
    const result = await createDidDoc;
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { issueTransmuteVc, genKeysTransmute, didDoc };
