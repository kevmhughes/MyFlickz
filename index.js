const express = require('express'),
//morgan middleware lib. that logs all requests
morgan = require('morgan');
const app = express();
//morgan with common functions
app.use(morgan('common'));
// a function for serving all static files from 'public'
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

let movies = [
    {
      title: 'Parasite',
      director: 'director 1'
    },
    {
      title: 'Toro',
      director: 'Kike Maillo'
    },
    {
      title: 'The Perfect Enemy',
      director: 'Kike Maillo'
    }
  ];

app.get('/movies', (req, res) => {
    res.json(movies);
  });

app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });