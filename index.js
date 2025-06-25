const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.listen(port, () => {
  console.log("Server listening on Port", port);
});
