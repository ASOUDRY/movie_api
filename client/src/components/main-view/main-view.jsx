import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import { LoginView } from '../login-view/login-view';
import { Register } from '../register/register';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile/profile-view.jsx';
import  GenreList  from '../genre-view/genre-list.jsx';
import { GenreMovie } from '../genre-view/genre-card.jsx';
import List from '../director-components/List.jsx';
import MoviesList from '../movies-list/movies-list';
import './main-view.scss';


import { connect } from 'react-redux';

import { setMovies, setUser, setDirectors, setGenres } from '../../actions/actions'

export class MainView extends React.Component {
    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();
  
      // Initialize the state to an empty object so we can destructure it later
      this.state = {
        user: null,
        // genres: [],
        // No longer a part of state
        // directors: [],
        genreMovie: [],
        directorMovie: [],
        loggedIn: false
      };
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user'),
          loggedIn: true
        });
        this.props.setUser(localStorage.getItem('user'));
        this.getMovies(accessToken);
        this.getGenres(accessToken);
        this.getDirectors(accessToken);  
        this.getGenres(accessToken);
      }
    }


// Prop for logging in
    onLoggedIn(data) {
      console.log(data);
      const username = data.user.Username;
      this.props.setUser(username)
        this.setState({
          user: data.user.Username,
          loggedIn: true,
        }, () => {
          console.log(this.state.loggedIn)
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', username);
  
        this.getMovies(data.token); 

        // It launches onLoggedIn
        this.getDirectors(data.token);
        this.getGenres(data.token);
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
       this.props.setGenres(response.data) 
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
        // Assigned Props to SetDirectors
        this.props.setDirectors(response.data)
       
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

      // Unrelated to Director View. Safe to ignore.
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

    // Added Directors to props
    let { movies, directors, genres } = this.props;
    let { user } = this.state;

    // console.log(movies);
    // console.log(genres);

    
    // let test = 24;
    
    
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { 
      // genres, 
      genreMovie, directorMovie, loggedIn } = this.state;

    const url = localStorage.getItem('user');
    return (
      
      <div className="SuperDiv">
      
      <Nav>
        <Nav.Item>
          <Nav.Link href="/client/movies" >Movies</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/client/Directors">Directors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/client/Genres">Genres</Nav.Link>
          </Nav.Item>
          <Nav.Item> 
            <Nav.Link href="/client/Profile">Profile</Nav.Link>
          </Nav.Item>
        </Nav>
      
      <Router basename="/client">
      <Route exact path="/"> {(!user) ? <Redirect to="/login" /> : <Redirect to="/movies"/>}</Route>
        <Route path="/login" render={() => { return <LoginView onLoggedIn={data => this.onLoggedIn(data)} /> }} />
        <Route path="/movies" render={() => {return <MoviesList movies={movies}/>;}} />

       

        <Route path="/Directors" render={() => {return <List directors={directors}/>;}} />

        <Route path="/Genres" render={() => {return <GenreList genres={genres}/>;}} />

{/* The end point that leads to the error */}
        {/* <Route path="/Directors" render={() => {return <DirectorList directors={directors}/>; }}  /> */}


        {/* <Route path="/Genres" render={() => { return genres.map(g => <GenreView genreProp={genreName => this.genreProp(genreName)} key={g._id} genres={g}/>);}}/> */}
        {/* <Route exact path="/Directors" render={() => { return directors.map(d => <DirectorView directorProp={directorTag => this.directorProp(directorTag)} key={d._id} directors={d}/>) }}/> */}
        {/* <Route exact path="/Director/:Director" render={() => { return directorMovie.map(dm => <DirectorCard directorProp={directorTag => this.directorProp(directorTag)} key={dm._id}  directorMovie={dm}/>) }}/> */}
        <Route exact path="/Genre/:Genre" render={() => { return genreMovie.map(gm => <GenreMovie key={gm._id}  genreMovie={gm}/>)}}/>
        <Route exact path="/singlemovie/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        <Route exact path="/singlemovie/:movieTitle/Favorite" render={({match}) => <MovieView movie={movies.find(m => m.Title === match.params.movieTitle)}/>}/>
        <Route path="/Register" render={() => {return <Register/>;}}/>      
        <Route path= "/Profile" render={ () => { return <ProfileView update={ (username) => this.update(username)} /> }}/>
      </Router>     
      </div>
    );
  }
}
// added Director 
let mapStateToProps = state => {
  return { movies: state.movies,
           users: state.users,
           genres: state.genres,
           directors: state.directors }
}
// added setDirectors
export default connect(mapStateToProps, { setMovies, setUser, setDirectors, setGenres } )(MainView);