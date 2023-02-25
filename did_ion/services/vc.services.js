const { writeFile, readFile } = require("fs/promises");

const unsignedVC = async data => {
  try {
    await writeFile("./unsignedVC.json", JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { unsignedVC };
