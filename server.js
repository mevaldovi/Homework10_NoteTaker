const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const json = require("./Develop/db/db.json"); //keep an eye out for errors concerning path to json file does not exist!!
const PORT = process.env.PORT || 3001;
const id = require("./idnumber");
//telling express below what middleware to use for parsing data/encoding the url
app.use(express.json()); //tells express we are going to be using json
app.use(express.urlencoded({ extended: true }));
//^^tells express to allow parsing URL-encoded objects and arrays into json
app.use(express.static("public")); //tells express we're going to be using the public folder
//GET request
app.get(
    "/",
    (
        req,
        res //get route for homepage!
    ) => res.sendFile(path.join(__dirname, "public/index.html"))
);
//get a path, there will be info about the request and the response,
//we're gioing to be sending the response data through the path and join the path to the index html
app.get("/", (req, res) => {
    res.send(
        'Use the API endpoint at <a href="https://localhost:3001/api/notes">localhost:3001/api</a>'
    ); //tells express to send a response
});

app.get("/api/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./Develop/db/db.json"))
);
//^^telling express to transfer the json file at the given path
app.get("*", (req, res) => res.json(`${req.method} request received`));

//^^get all saved notes and send the response data in json

app.post("/api/notes", (req, res) => {
    res.json(req.body);
}); //create a user request for /api/notes and send a response in json

app.post("*", (req, res) => res.json(`${req.method} request received`));
//^create a user request for "*" and a response in json

app.post("/", function(req, res, next) {
    console.log(req.body);
    const notesid = () => {
        return Math.floor(1 + Math.random() * 0x10000)
            .toString(16)
            .substring(1);
    };
    const newNote = ({ title, text, id } = req.body);
    if (title && text && id) {
        const newNote = {
            title,
            text,
            id: notesid(),
        };

        fs.readFile("./db/notes.json", "utf8", (err, data) => {
            if (err) {
                console.log(error);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
            }
        });
    }
});

app.listen(PORT, () => console.log(`App listening on port${PORT}`));
//telling express to listen in the port for both the requests and/or responses coming in and going out