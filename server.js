// importing express package for the server 
const express = require('express');
// importing file path resolution methods
const path = require('path');
// writefile method
const fs = require('fs');
// const api = require('./routes/apiroutes');
// const htmlroutes = require ('./routes/htmlroutes');
const db = require('./db/db.json');

// defining port variable
const PORT = process.env.port || 3001;
// creating server object
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// determines where the supporting assets are going to be pulled from 
app.use(express.static('public'));



// GET Route for notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for reading the db.json file 
app.get('/api/notes', (req, res) =>
  res.json('/db/db.json')
);
// GET Route for index.html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
    note = req.body;
       db.push(note);
       res.json(db);  
    // } else {
    //     res.error('Error in adding new notes');
    // }
});

// listens to port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);