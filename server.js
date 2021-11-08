//Import the required dependencies
const fs = require("fs")
const path = require("path")
const express = require("express")
const uuid = require('./helpers/uuid');

// Set up the Express App
const app = express()
// Set up the Port for listening
const PORT = process.env.PORT || 3001

// Define middleware to handle public assets and responses
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// HTML route to retrieve notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// HTML route to retrieve index
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// API route to read the database as JSON
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// API route to POST new note to database db.json file
app.post("/api/notes", (req, res) => {
    let newNote = req.body
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    
    // New random ID
    newNote.id = uuid()
    // Add the new note to the noteList 
    noteList.push(newNote);

    // Write to database
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

// API route to DELETE a note by ID
app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    let noteId = (req.params.id).toString()

    // Select all notes except the one to be deleted. Save to new noteList
    noteList = noteList.filter(selected => {
        return selected.id != noteId
    })

    // Update database excluding note to be deleted
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList))
    res.json(noteList)
})

// PORT listening
app.listen(PORT, () => console.log(`Note Taker listening at http://localhost:${PORT} 🚀`))