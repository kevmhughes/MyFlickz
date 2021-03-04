const express = require('express');
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport= require('passport');
require('./passport');


const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true});

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

// This ensures that Express is available in the auth.js file, too
let auth = require('./auth')(app);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something has broken!');
  });

// Welcome to MyFlix
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
  });  

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({Username: req.params.Username})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
});

// Get a list of all the movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

  // Get movie by title
  // A JSON object holding data about a single movie containing title, description, genre, director and image URL.
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

//A JSON object handling data about the genre description.
  app.get('/movies/genres/:Name', (req, res) => {
    Movies.findOne({'Genre.Name': req.params.Name})
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
  });

  //A JSON object handling data on the director biography.
  app.get('/movies/directors/:Name', (req, res) => {
    Movies.findOne({'Director.Name': req.params.Name})
    .then((movie) => {
      res.json(movie.Director);
      // FOR ONLY BIO TRY THIS!!! res.json(movie.Director.Bio); REMOVE LATER!!!
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
  });

  //Add a user
  /* We’ll expect JSON in this format
  {
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
  }*/
  app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
  app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, { $set:
    {
      Username:req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true}, // This line makes sure that the updated document is returned
  (err, updateUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updateUser);
    }
    });
  });


  // Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $addToSet: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

  // remove a movie to a user's list of favorites
  app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

  // Delete a user by username
  app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });