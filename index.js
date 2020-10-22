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

  app.post('/Users', (req, res) => {                
    let newuser = req.body;
  if (!newuser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newuser.id = uuid.v4();
    Users.push(newuser);
    res.status(201).send(newuser);
  }
});

  // app.put('/User/:Account', (req, res) => {                  
  //   res.send("You put your info here")
  // });

  // app.put('/User/:Account/:Favorite/:Name', (req, res) => {                  
  //   res.send("Lets add Jurrassic Park to your favorites.")
  // });

  // app.delete('/User/:Account/:Favorite/:Name', (req, res) => {                  
  //   res.send("Terminator 2 is sci fi not fantasy, get out of my favorites.");
  // });

  // app.delete('/User/:Account', (req, res) => {                  
  //   res.send("Remove account");
  // });
// listen for requests
app.listen(8080, () => {
  console.log('Listening');
});