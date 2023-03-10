require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/ion", require("./routes/ion.routes"));
app.use("/api/vc", require("./routes/vc.routes"));
app.use("/api/transmute", require("./routes/transmute.routes"));

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
