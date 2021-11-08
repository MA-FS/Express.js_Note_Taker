//Import the required dependencies
const path = require("path")
const express = require("express")
const api = require('./routes/main.js')

// Set up the Express App
const app = express()
// Set up the Port for listening
const PORT = process.env.PORT || 3001

// Define middleware to handle public assets and responses
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', api)

// HTML route to retrieve notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// HTML route to retrieve index
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// PORT listening
app.listen(PORT, () => console.log(`Note Taker listening at http://localhost:${PORT} 📝`))