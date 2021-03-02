import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import { LoginView } from '../login-view/login-view';
import { Register } from '../register/register';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile/profile-view.jsx';
import { GenreView } from '../genre-view/genre-view.jsx';
import { GenreMovie } from '../genre-view/genre-card.jsx';
import { DirectorView} from '../director-view/director-view.jsx';
import { DirectorCard} from '../director-view/director-card.jsx';
import MoviesList from '../movies-list/movies-list';
import './main-view.scss';


import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions'

export class MainView extends React.Component {
    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();
  
      // Initialize the state to an empty object so we can destructure it later
      this.state = {
        // user: null,
        genres: [],
        directors: [],
        genreMovie: [],
        directorMovie: [],
      };
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.props.setUser(localStorage.getItem('user'));
        this.getMovies(accessToken);
        this.getGenres(accessToken);
        this.getDirectors(accessToken);
      }
    }
// Prop for logging in
    onLoggedIn(data) {
      const username = data.user.Username;
      this.props.setUser(username)
        this.setState({
          user: data.user.Username
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', username);
        this.getMovies(data.token);
    }

// Updates the local user host
    update(username) {
      console.log(username + " is the username here!");
      this.props.setUser(username)
      localStorage.removeItem("user")
      localStorage.setItem('user', username);
    }


// Fetching the data for  the movies
    getMovies(token) {
      axios.get('https://moviecat0l0gue.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
        .then(response => {
          this.props.setMovies(response.data);
      })
        .catch(function (error) {
          console.log(error);
      });
    }
    
    getGenres(token) {
      axios.get('https://moviecat0l0gue.herokuapp.com/genres', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({ 
        genres: response.data 
        });
      })
        .catch(function (error) {
          console.log(error);
      });
    }

    getDirectors(token) {
      axios.get('https://moviecat0l0gue.herokuapp.com/directors', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({ 
        directors: response.data 
        });
      })
        .catch(function (error) {
          console.log(error);
      });
    }

   
// Props for filtering out genre and director
    genreProp(genreName) {
      let token = localStorage.getItem('token');
      axios.get(`https://moviecat0l0gue.herokuapp.com/genres/${genreName}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          genreMovie: response.data
        })
      })}

    directorProp(directorTag) {
        let token = localStorage.getItem('token');
        axios.get(`https://moviecat0l0gue.herokuapp.com/directors/${directorTag}`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            directorMovie: response.data
          })
        })}
       
    render() {

    // Two new let variables
    let { movies } = this.props;
    let { user } = this.state;
    
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { genres, directors, genreMovie, directorMovie } = this.state;
    console.log(genres);
    const url = localStorage.getItem('user');
    return (
      <div className="SuperDiv">
      
      <Nav>
        <Nav.Item>
          <Nav.Link href="/movies" >Movies</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Directors">Director</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Genres">Genre</Nav.Link>
          </Nav.Item>
          <Nav.Item> 
            <Nav.Link href="/users/Profile">Profile</Nav.Link>
          </Nav.Item>
        </Nav>
      
      <Router>
        <Route path="/" render={() => { 
          // if (!user) 
          return <LoginView onLoggedIn={data => this.onLoggedIn(data)} /> }} />
        <Route path="/movies" render={() => {return <MoviesList movies={movies}/>;}} />
        <Route path="/Genres" render={() => { return genres.map(g => <GenreView genreProp={genreName => this.genreProp(genreName)} key={g._id} genres={g}/>);}}/>
        <Route exact path="/Directors" render={() => { return directors.map(d => <DirectorView directorProp={directorTag => this.directorProp(directorTag)} key={d._id} directors={d}/>) }}/>
        <Route exact path="/Director/:Director" render={() => { return directorMovie.map(dm => <DirectorCard directorProp={directorTag => this.directorProp(directorTag)} key={dm._id}  directorMovie={dm}/>) }}/>
        <Route exact path="/Genre/:Genre" render={() => { return genreMovie.map(gm => <GenreMovie key={gm._id}  genreMovie={gm}/>)}}/>
        <Route exact path="/singlemovie/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        <Route exact path="/singlemovie/:movieTitle/Favorite" render={({match}) => <MovieView movie={movies.find(m => m.Title === match.params.movieTitle)}/>}/>
        <Route path="/Register" render={() => {return <Register/>;}}/>      
        <Route path='/users/Profile' render={ () => { return <ProfileView update={ (username) => this.update(username)} /> }}/>
      </Router>     
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies,
           users: state.users }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);