import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://programming-quotesapi.vercel.app/api/";

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
  const result = await axios.get(API_URL + "random");
  res.render("index.ejs", {
    quote: result.data.quote,
    programmer: result.data.author,
  });
} catch (error) {
  console.log(`Error fetching random quote: ${error.message}`);
  res.render("index.ejs", {
    error: error.message,
  });
}
});

app.post("/programmer", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "bulk?author=" + req.body.programmer);
    let randomIndex = Math.floor(Math.random() * result.data.length);
    //console.log(result.data);
    res.render("index.ejs", {
      quote: result.data[randomIndex].quote,
      programmer: result.data[randomIndex].author,
    });
  } catch (error) {
    console.log(`Error fetching random quote from programmer: ${req.body.programmer}: ${error.message}`);
    res.render("index.ejs", {
    error: error.message,
  });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});