const express = require('express'),

bodyParser = require('body-parser'),
//individual ID creator
uuid = require('uuid'),
//morgan middleware lib. that logs all requests
morgan = require('morgan');
const app = express();
//morgan with common functions
app.use(morgan('common'));
// a function for serving all static files from 'public'
app.use(express.static('public'));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  let users = [
    { username : 'hey', 
      password : 'hey 1', 
      email : 'hey1@mail.com', 
      birth: '1878-12-12' 
    },
    {
      username : 'he', 
      password : 'he 1', 
      email : 'he1@mail.com', 
      birth: '1878-12-12' 
    },
    {
      username : 'h', 
      password : 'h 1', 
      email : 'h1@mail.com', 
      birth: '1878-12-12' 
    }
  ];

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

// Welcome to MyFlix
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
  });  

// A JSON object holding data about all the users
  app.get('/users', (req, res) => {
  res.json(users);
  });

// A JSON object holding data about all the movies
  app.get('/movies', (req, res) => {
    res.json(movies);
  });

// A JSON object holding data about a single movie, 
// containing title, description, genre, director and image URL.
  app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
    { return movie.title === req.params.title}));
  });

  //A JSON object handling data about the genre description.
  app.get('/movies/genres/:name', (req, res) => {
    res.send('Genre description goes here');
  });

  //A JSON object handling data on the director biography.
  app.get('/movies/directors/:name', (req, res) => {
    res.send('Director biography goes here');
  });

  //Adds data for a new user to our list of users.
  //A JSON object handling data about the user to be added.
  app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing name in request body';
    res.status (400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//FIX!!!!.
  app.put('/users/:username', (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username });

    if (user) {
      user.username[req.params.username] = parseInt(
        req.params.username);
        res.status(201).send('User: ' + req.params.username + 
        ' was updated');
    } else {
      res.status(404).send('User with the name ' 
      + req.params.username + ' was not found.');
    }
  });

  //To add a fave movie to the fave movie list
  app.post('/users/:username/movies/:movieid', (req, res) => {
    res.send('The movie was added to your list of favourite movies!');
  });

  //To delete a fave movie from the fave movie list
  app.delete('/users/:username/movies/:movieid', (req, res) => {
  res.send('Your fave movie list has been modified!');
  });

  //To delete a user´s profile
  app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username });

    if (user) {
      users = users.filter((obj) => {
        return obj.username !== req.params.username });
        res.status(201).send('User:' + req.params.username + ' was deleted.');
    }
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });