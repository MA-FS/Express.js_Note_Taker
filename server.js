//Import the required dependencies
const fs = require("fs")
const path = require("path")
const express = require("express")

// Set up the Express App
const app = express();
// Set up the Port for listening
const PORT = process.env.PORT || 3001;

// Define middleware to handle public assets and responses
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML route to retrieve notes
