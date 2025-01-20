import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for selection..." });
});

app.post("/", async (req, res) => {
    const { catSelect, categories, language, blacklistFlags, jokeTypes, searchString, jokeAmount } = req.body;

    console.log("Selected Category:", catSelect);
    console.log("Selected Categories:", categories);
    console.log("Language:", language);
    console.log("Blacklist Flag:", blacklistFlags);
    console.log("Joke Type:", jokeTypes);
    console.log("Search String:", searchString);
    console.log("Jokes Amount:", jokeAmount);

    const URL = `${API_URL}/${catSelect}`
    console.log(URL + "\n");
  
    try {
        const response = await axios.get(URL);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { setup: result.setup, delivery: result.delivery });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});