const { writeFile } = require("fs/promises");

const createUnsignedVC = (req, res) => {
  res.send({ message: "unsigned vc created" });
};

module.exports = { createUnsignedVC };
