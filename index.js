const express = require("express"),
morgan = require('morgan');
const app = express();
app.use(morgan('common'));

app.use(express.static('public'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Check for errors');
  });

  let movies = [
    {
        Title: "Jurassic Park",
        Genre: "Science"
    },
    {
        Title: "Godzilla Final Wars"
    },
    {
        Title: "Gremlins"
    },
    {
        Title: "Hercules"
    },
    {
        Title: "Pacific Rim"
    },
    {
        Title: "Scooby Doo and the Ghoul School"
    },
    {
        Title: "Spiderman Into the Spiderverse"
    },
    {
        Title: "One Piece: Film Z"
    },
    {
        Title: "Digimon The Movie"
    },
    {
        Title: "Princess Mononoke"
    }
]
// Can't access this by going to / in the local host
app.get('/', (req, res) => {
  res.send('There is little notion more idiotic than fantasy being only being for children. The horros of reality, make it a equally enticing aspect for adults');
});

app.get('/top', (req, res) => {                  
  res.json(topmovies);
});

app.get('/movies', (req, res) => {                  
    res.send("All The Movies");
  });

app.get('/movies/[Genre]/[Title]', (req, res) => {                  
    res.send("Single Movie");
});

app.get('/movies/[Genre]', (req, res) => {                  
     res.send("Urban Fantasy is a genre more common for literature")
});

app.get('/movies/[Genre]/[Title]/Directors/[Name]', (req, res) => {                  
    res.send("Spielsburg is a treasure")
  });

  app.post('/User/[Account]', (req, res) => {                  
    res.send("Account is created")
  });

  app.put('/User/[Account]', (req, res) => {                  
    res.send("You put your info here")
  });

  app.put('/User/[Account]/[Favorite]/[Name]', (req, res) => {                  
    res.send("Lets add Jurrassic Park to your favorites.")
  });

  app.delete('/User/[Account]/[Favorite]/[Name]', (req, res) => {                  
    res.send("Terminator 2 is sci fi not fantasy, get out of my favorites.");
  });

  app.delete('/User/[Account]', (req, res) => {                  
    res.send("Remove account");
  });
// listen for requests
app.listen(8080, () => {
  console.log('Listening');
});