const express = require("express");
const path = require("path");
const app = express();
const json = require("./Develop/db/db.json") //keep an eye out for errors concerning path to json file does not exist!!
const PORT = process.env.PORT || 3001;
//telling express below what middleware to use for parsing data/encoding the url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //tells express we're going to be using the public folder
//GET request 
app.get('/', (req, res) => //get route for homepage!
    res.sendFile(path.join(__dirname, "public/index.html")));
//get a path, there will be info about the request and the response, 
//we're gioing to be sending the response data through the path and join the path to the index html

app.listen(PORT, () => console.log(`App listening on port${PORT}`));
//telling express to listen in the port for both the requests and/or responses coming in and going out