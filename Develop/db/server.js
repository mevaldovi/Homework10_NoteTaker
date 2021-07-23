const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public")); //tells express we're going to be using the public folder

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html")));