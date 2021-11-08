// Import Dependencies
const notes = require('express').Router()
const uuid = require('../helpers/uuid')
const fs = require("fs")
const path = require("path")

// API route to send the database as JSON
notes.get("/", (req, res) => {
    console.info(`${req.method} request received for notes`)
    res.sendFile(path.join(__dirname, '../db/db.json'))
})

// API route to POST new note to database db.json file
notes.post("/", (req, res) => {
    console.info(`${req.method} request received for notes`)
    let newNote = req.body
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    
    // New random ID
    newNote.id = uuid()
    // Add the new note to the noteList 
    noteList.push(newNote);

    // Write to database
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})

// API route to DELETE a note by ID
notes.delete("/:id", (req, res) => {
    console.info(`${req.method} request received for notes`)
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    let noteId = (req.params.id).toString()

    // Select all notes except the one to be deleted. Save to new noteList
    noteList = noteList.filter(selected => {
        return selected.id != noteId
    })

    // Update database excluding note to be deleted
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList))
    res.json(noteList)
})

module.exports = notes