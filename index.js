import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { error: "Waiting for selection..." });
});

app.post("/", async (req, res) => {
    const URL = generateURL(req.body);
    console.log(URL + "\n");
  
    try {
        const response = await axios.get(URL);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { setup: result.setup, delivery: result.delivery, joke: result.joke });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function generateURL(data) {
    const { catSelect, categories, language, blacklistFlags, jokeTypes } = data;
    let updatedURL = API_URL;

    console.log("Selected Category:", catSelect);
    console.log("Selected Categories:", categories);
    console.log("Language:", language);
    console.log("Blacklist Flag:", blacklistFlags);
    console.log("Joke Type:", jokeTypes);

    if(catSelect == "any")
        updatedURL = updatedURL + catSelect;
    else if (catSelect == "multi") {
        updatedURL = updatedURL + categories.toString();
    }

    if(language !== "en")
        updatedURL = updatedURL + "?lang=" + language;

    if(blacklistFlags)
        updatedURL = updatedURL + "&blacklistFlags=" + blacklistFlags.toString();

    if(jokeTypes.length !== 2)
        updatedURL = updatedURL + "?type=" + jokeTypes;

    return updatedURL;
}