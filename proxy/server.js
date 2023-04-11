const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(5000, () => {
  console.log("Server has been started on port 5000...");
});
