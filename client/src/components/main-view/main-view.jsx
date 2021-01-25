import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { Register } from '../register/register';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();
  
      // Initialize the state to an empty object so we can destructure it later
      this.state = {
        movies: null,
        selectedMovie: null,
        user: null
      };
    }

    componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

    
      // onMovieClick(movie) {
      //   this.setState({
      //     selectedMovie: movie
      //   });
      // }

      // onLoggedIn(user) {
      //   this.setState({
      //     user
      //   });
      // }

      onRegister(user) {
        this.setState({
          user
        });
      }

      // onRegister(data) {
      //   console.log(data)
      //   this.setState({
      //     user: data.username
      //   });
      //   localStorage.setItem('token', data.token);
      //   localStorage.setItem('user', data.username);
      //   this.getMovies(data.token);
      // }


      // onLoggedIn(authData) {
      //   console.log(authData);
      //   this.setState({
      //     user: authData.user.name
         
      //   });
      //   localStorage.setItem('token', authData.token);
      //   localStorage.setItem('user', authData.user.name);
      //   this.getMovies(authData.token);
      // }

      getMovies(token) {
        axios.get('https://moviecat0l0gue.herokuapp.com/movies', {
          // headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
     
      render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user} = this.state;

    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!user) return <Register onRegister={user => this.onRegister(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;
  
    return (
      <div className="main-view">
       {selectedMovie
          ? <MovieView movie={selectedMovie}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
       }
      </div>
     );
  }
}