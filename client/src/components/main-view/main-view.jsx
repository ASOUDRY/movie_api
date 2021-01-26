import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";

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
     
   onLoggedIn(data) {
      console.log(data.Username)
        this.setState({
          user: data.Username
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.Username);
        this.getMovies(data.token);
    }

      getMovies(token) {
        axios.get('https://moviecat0l0gue.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
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
    const { movies, user} = this.state;

    // if (!user) return <LoginView />
    // onLoggedIn={user => this.onLoggedIn(user)} />;

    // return <Register onRegister={user => this.onRegister(user)} />;

    // // Before the movies have been loaded
    // if (!movies) return <div className="main-view"/>;


    return (
      <Router>
        <div className="main-view">
        {/* <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/> */}
        <Route path="/login" render={() => {
          console.log("login is working");
          return <LoginView />
        }} />
        <Route path="/Register" render={() => {
            //  if (!user) 
             return <Register 
            //  onRegister={user => this.onRegister(user)}
             />;
            }}
             />
        </div>

        
      </Router>
         /* <div className="main-view">
         
          
          <Route exact path="/" render={() => {
            // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            // return movies.map(m => <MovieCard key={m._id} movie={m}/>)
          }}/>
          
          <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route exact path="/genres/:name" render={/* genre view*/
          /* <Route exact path="/:directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
         </div> */
    );
  }}

  
//     return (
//       <Router>
//         <div className="main-view">
//        {selectedMovie
//           ? <MovieView movie={selectedMovie}/>
//           : movies.map(movie => (
//             <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
//           )){
//        }
//       </div>
//       </Router>
//      );
//   }
// }