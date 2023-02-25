const { unsignedVC } = require("../services/vc.services");

const createUnsignedVC = async (req, res) => {
  try {
    await unsignedVC(req.body);
    res
      .status(201)
      .send({ message: "unsigned vc created at ./unsignedVC.json" });
  } catch (error) {
    console.log(error.message);
    res.end();
  }
};

module.exports = { createUnsignedVC };
