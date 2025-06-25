const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



let formate = "summary $ explanation $ examples $ points_heading $ 'point1 ' ' point2' ' point3' 'point4 ' $ quotes_or_fun_fact";

let resp;

app.get("/", (req, res) => {
  try {
    res.render("index.ejs");
  } catch (err) {
    console.error("Failed to fetch from Gemini:", err.message);
    res.render("index.ejs");
  }
});

app.post("/", async (req, res) => {
  const { question } = req.body;

  const ai = new GoogleGenAI({ apiKey: "API_KEY_HERE" });

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give the answer for: "${question}" in this format: ${formate} by replacing the sub-titles into content .Return with plain text string`,
    });
    resp = response.text;
    return resp
  }


  await main();

  try {
    function splitByDollar(str) {
      return str
        .split('$')               // Split at each "$"
        .map(item => item.trim()) // Trim whitespace from each part
        .filter(item => item);    // Remove empty items
    }


    const array = splitByDollar(resp);
    res.render("result.ejs", { array, question });
  } catch (err) {
    console.error("JSON parse failed:", err.message);
    res.render("index.ejs");
  }
})





app.listen(port, () => {
  console.log("Server listening on Port", port);
});
