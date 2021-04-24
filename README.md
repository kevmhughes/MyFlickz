# [MyFlickz](https://myflickz.herokuapp.com/client/)

<kbd>
<img src="images-readme/img1.png"/>
</kbd>

### This application is a full stack project built using the **MERN** stack.

Go to the app [here](https://myflickz.herokuapp.com/client/)

#### Client Side:
The UI was built using **React**, and handles data requested by the user through the REST API [endpoints](https://github.com/kevmhughes/MyFlickz/blob/main/README.md#endpoints) defined below.

#### Server Side:
The **REST API**, and database, were built using **JavaScript**, **Node.js**, **Express**, and **MongoDB**.

# Description
**MyFlickz** is a film buff's dream. It is essentially a database of movies, genres, and directors, where users can browse through a large selection of films and enrich their knowledge of cinema. 

# Tools Used

### Development Environment
* Node.js

### Libraries & Frameworks
* React 
* Mongoose
* Express 

### Database
* MongoDB

### Hosting
* Heroku

### Other
* Postman
* Parcel 
* React Redux
* Bootstrap

# Features

### Users are able to:

* create an account.
* see all the movies in the database.
* get detailed information on a single movie by movie title.
* get detailed information on a genre by genre name, and view other movies in the same genre.
* get detailed information on a director by name, and view other movies from the same director.
* create a list of their favourite movies.
* update their user information.
* delete their account.

# Endpoints

<body>
<table class="doctable">
    <thead>
        <tr>
            <th>Business Logic</th>
            <th>URL</th>
            <th>HTTP Method</th>
            <th>Request Body Data Format</th>
            <th>Response Body Data Format</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Return a list of ALL movies to the user</td>
            <td>/movies</td>
            <td>GET</td>
            <td>None</td>
            <td>A JSON object holding data about all the movies</td>
          </tr>
          <tr>
            <td>
              Return data (description, genre, director, image URL) on a single
              film by title
            </td>
            <td>/movies/[Title]</td>
            <td>GET</td>
            <td>None</td>
            <td>
              A JSON object holding data about a single movie, containing title,
              description, genre, director and image URL.
              <p>Example:</p>
              <p style="color:blue">
                { title : "Avatar", description : "A genetically engineered Na'vi
                body operated from the brain of a remotely located human that is
                used to interact with the natives of Pandora helps save the
                Na´vi", genre : "Fantasy" director : "James Cameron", image URL:
                http://imageurl.jpg }
              </p>
            </td>
          </tr>
          <tr>
            <td>Return data on genre description</td>
            <td>/movies/genres/[Name]</td>
            <td>GET</td>
            <td>None</td>
            <td>
              A JSON object handling data about the genre description.
              <p>Example:</p>
              <p style="color:blue">
                { genre : "Fantasy", description : "Fantasy films are films that
                belong to the fantasy genre with fantastic themes, usually magic,
                supernatural events, mythology, folklore, or exotic fantasy
                worlds." }
              </p>
            </td>
          </tr>
          <tr>
            <td>Return data on director biography</td>
            <td>/movies/directors/[Name]</td>
            <td>GET</td>
            <td>None</td>
            <td>
              A JSON object handling data on the director biography.
              <p>Example:</p>
              <p style="color:blue">
                { name : "James Cameron", bio : "James Francis Cameron is a
                Canadian filmmaker and environmentalist, who is best known for
                making science fiction and epic films for the Hollywood
                mainstream. Cameron first gained recognition for directing The
                Terminator.", date of birth: "August 16th, 1954" }
              </p>
            </td>
          </tr>
          <tr>
            <td>Allow new users to register</td>
            <td>/users</td>
            <td>POST</td>
            <td>
              A JSON object handling data about the user to be added.
              <p>Example:</p>
              <p style="color:blue">
                { username : "username123", password : "username123password",
                e-mail : username123@email.com, date of birth: "1987-08-21" }
              </p>
            </td>
            <td>
              A JSON object handling data about the new user that was added, and
              including an assigned ID number.
              <p>Example:</p>
              <p style="color:blue">
                { id: "123456789", username : "username123", password :
                "username123password", e-mail : username123@email.com, date of
                birth: "1987-08-21" }
              </p>
            </td>
          </tr>
          <tr>
            <td>
              Allow users to update their user information (username, password,
              email, date of birth)
            </td>
            <td>/users/[Username]</td>
            <td>PUT</td>
            <td>
              A JSON object holding data about the user to add, structured like:
              <p style="color: blue">
                { "Username" : "Newusername1231561", "Password" :
                "Newpassword3486198", "Email" : "Newemail16513651@gmail.com",
                "Birthday" : "1980-10-15" }
              </p>
            </td>
            <td>
              A text message indicating that the user´s information was updated
            </td>
          </tr>
          <tr>
            <td>Allow users to add a movie to their list of favourite movies</td>
            <td>/users/[Username]/movies/[MovieID]</td>
            <td>POST</td>
            <td>None</td>
            <td>
              A text message indicating that the movie was added to the user´s
              list of favourite movies
            </td>
          </tr>
          <tr>
            <td>
              Allow users to remove a movie from their list of favourite movies
            </td>
            <td>/users/[Username]/movies/[MovieID]</td>
            <td>DELETE</td>
            <td>None</td>
            <td>
              A text message indicating that a movie was removed from the user´s
              list of favourite movies
            </td>
          </tr>
          <tr>
            <td>Allows existing users to deregister</td>
            <td>/users/[Username]</td>
            <td>DELETE</td>
            <td>None</td>
            <td>A text message indicating that the user was removed</td>
          </tr>
    </tbody>
</table>

</body>



