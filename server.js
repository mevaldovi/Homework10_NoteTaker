const { raw } = require("body-parser");
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
app.use(express.static("Develop/public")); //tells express we're going to be using the public folder
//GET request
app.get(
    "/",
    (
        req,
        res //get route for homepage!
    ) => res.sendFile(path.join(__dirname, "Develop/public/index.html"))
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
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
);
//^^get all saved notes and send the response data in json
app.get("/api/reviews/:notes_id", (req, res) => {
    if (req.body && req.params.notes_id) {
        console.log(`{req.method} request received to get a single note`);
        const noteId = req.params.notes_id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.notes_id === noteId) {
                res.json(currentNote);
                return;
            }
        }
        res.json("Note Id not found");
    }
});
//POST request to ADD a note
app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received to add a note`);
    //log whichever req method was used to addthe note
    let response;
    //^^prepare a response object to send back to the client;
    if (req.body && req.body.text) {
        response = {
            status: "success!",
            data: req.body,
        };
        res.json(`note for ${response.data.text} has been added!`);
    } else {
        res.json("request body must at least contain some text");
    }
    console.log(req.body);
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        const newNote = req.body;
        const notes = JSON.parse(data)
        notes.push(newNote);
        console.log(notes)
        fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), err => {
            if (err) throw err;
            res.end();
        })
    });
});

app.post("/api/notes/:notes_id", (req, res) => {
    if (req.body && req.params.notes_id && req.body.requestid) {
        console.log(`${req.method} request received to give note an id`);
        //^^tell express to get the parameter for the note's id number and console.log the request to the server
        let requestedId;
        //^^prepare requestedId variable
        if (typeof req.body.requestid === "boolean") {
            requestedId == req.body.requestid;
        } else {
            (requestedId == req.body.requestid) == "true";
        }
        console.log(req.body);
        //log the request body ^^
        const reviewId = req.params.notes_id;

        for (let i = 0; i < notes.length; i++) {
            const currentId = notes_id[i];
            if (currentId.notes_id === reviewId && requestedId) {
                currentId.requestid += 1;
            }
        }
    }
});
//^^check if there is anything in the response body;
// app.post("*", (req, res) => {
//         console.log(`{req.method} request received`);
//         let response;
//         if (req.body && req.body.text) {
//             response = {
//                 status: "success!",
//                 data: req.body,
//             }
//         }
//     }
//     res.json(`${req.method} request received`));
//^create a user request for "*" and a response in json

// app.post("/", function(req, res, next) {
//     console.log(req.body);
//     const notesid = () => {
//         return Math.floor(1 + Math.random() * 0x10000)
//             .toString(16)
//             .substring(1);
//     };
//     const newNote = ({ title, text, id } = req.body);
//     if (title && text && id) {
//         const newNote = {
//             title,
//             text,
//             id: notesid(),
//         };

//         fs.readFile("./db/notes.json", "utf8", (err, data) => {
//             if (err) {
//                 console.log(error);
//             } else {
//                 const parsedNotes = JSON.parse(data);
//                 parsedNotes.push(newNote);

//                 fs.writeFile(
//                     "./db/notes.json",
//                     JSON.stringify(parsedNotes, null, 4),
//                     (writeErr) =>
//                     writeErr ?
//                     console.log(err) :
//                     console.log("successfully updated notes!!")
//                 );
//             }
//         });
//     }
// });

app.listen(PORT, () => console.log(`App listening on port${PORT}`));
//telling express to listen in the port for both the requests and/or responses coming in and going out