// importing express package for the server 
const express = require('express');
// importing file path resolution methods
const path = require('path');
// writefile method
const fs = require('fs');
// 
// const api = require('./routes/')

// defining port variable
const PORT = 3001;
// creating server object
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
// determines where the supporting assets are going to be pulled from 
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);






app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);