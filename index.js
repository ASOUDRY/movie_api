const { response } = require("express");
const express = require("express"),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();
app.use(bodyParser.json())
// error code
app.use(morgan('common'));
app.use(express.static('public'))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Check for errors');
  });
// error code

app.get('/movies', (req, res) => {                  
    res.send("All The Movies");
  });

app.get('/movies/:Genre/:Title', (req, res) => {                  
    res.send("Single Movie");
});

app.get('/movies/:Genre', (req, res) => {                  
     res.send("Urban Fantasy is a genre more common for literature")
});

app.get('/movies/:Genre/:Title/Directors/:Name', (req, res) => {                  
    res.send("Spielsburg is a treasure")
  });

app.post('/users', (req, res) => {                
    let newuser = req.body;
  if (!newuser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newuser.id = uuid.v4();
    res.status(201).send(newuser);
  }
});

app.put('/users/:account', (req, res) => { 
    let update = req.body;
      res.status(201).send(update);
    });

app.put('/users/:account/:favorite/:name', (req, res) => {   
  let update = req.body;
      res.status(201).send(update);
  });

  app.delete('/users/:account/:favorite/:name', (req, res) => {  
    res.status(201).send("Deleted");
  });

  app.delete('/users/:id', (req, res) => {  
    res.status(201).send("Deletion")                
  });
// listen for requests
app.listen(8080, () => {
  console.log('Listening');
});