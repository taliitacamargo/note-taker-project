// importing express package for the server 
const express = require('express');
// importing file path resolution methods
const path = require('path');
// writefile method
const fs = require('fs');
// const api = require('./routes/apiroutes');
// const htmlroutes = require ('./routes/htmlroutes');

let notes = require('./db/db.json');

const { readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
// readFromFile('./db/db.json')
// .then((notes) = res.json(JSON.parse(notes)));
});

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
  const getNotes = notes;
  console.log(getNotes);
  const newNotes = getNotes.filter((note) => note.note_id !== req.params.id)
  fs.writeFileSync("./db/db.json", JSON.stringify(newNotes, null, 4))
  notes = newNotes
  console.log(newNotes);
  res.send(newNotes)
})

app.get('/api/notes/:id', (req, res) =>
res.json(notes.find(note => note.node_id === req.params.id)));

// 

// ================================================================== //

// listens to port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
