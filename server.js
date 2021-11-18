// importing express package for the server 
const express = require('express');
// importing file path resolution methods
const path = require('path');
// writefile method
const fs = require('fs');
// const api = require('./routes/apiroutes');
// const htmlroutes = require ('./routes/htmlroutes');

const notes = require('./db/db.json');

const { readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');


const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// determines where the supporting assets are going to be pulled from 
app.use(express.static('public'));


// ==================================================================== //

// GET Route for notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for reading the db.json file 
app.get('/api/notes', (req, res) => {
console.log('GET /api/notes triggered.... notes is ')

console.log(notes)
  res.json(notes)
}
);
// GET Route for index.html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
  const {title,text} = req.body;
  
       if (req.body) {
        const newNote = {
          title,
          text,
          note_id: uuid(),
        }; 
     
  console.log("notes is:")
  console.log(notes)
  console.log("note:")
  console.log("newNote:")
  console.log(newNote)

      readAndAppend(newNote, './db/db.json');
      res.json('new note added successfully')
    } else {
        res.error('Error in adding new notes');
    }
});

app.delete("/api/notes/:id",(req,res)=> {
  console.log("this deletes routes: ");
  const getNotes = JSON.parse(notes);
  console.log(getNotes);
  getNotes.filter((note) => note.id !== req.body.id)
  .then((filterednotes) => {
    fs.writeFile(filterednotes)
  })
}
)
// app.get('/api/notes/:id', (req, res) => {
// const noteId = JSON.parse(req.params.id) 
// console.log(noteId)

// fs.readFile('./db/feedback.json')
// notes.JSONparse(notes)
// notes = fnotes.filter(val => val.id !== noteId)
// fs.writeFile('./db/feedback.json', JSON.stringify(notes))
// res.json(notes)
// });


// ================================================================== //

// listens to port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);