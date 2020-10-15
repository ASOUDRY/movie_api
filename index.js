const express = require("express"),
morgan = require('morgan');
const app = express();
app.use(morgan('common'));

app.use(express.static('public'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Check for errors');
  });

let topmovies = [
    {
        Title: "Jurassic Park"
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

app.get('/movies', (req, res) => {                  
  res.json(topmovies);
});

// listen for requests
app.listen(8080, () => {
  console.log('Listening');
});