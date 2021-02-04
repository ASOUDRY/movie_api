import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import { LoginView } from '../login-view/login-view';
import { Register } from '../register/register';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view';
import { Profile } from '../profile/profile';
import { GenreCard } from '../genre-view/genre-view.jsx';
import { GenMovieCard } from '../genre-view/genMovie-card.jsx';
import { DirectorCard} from '../director-view/director-view.jsx';
import { DirMovieCard} from '../director-view/dirMovie-card.jsx';

export class MainView extends React.Component {
    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();
  
      // Initialize the state to an empty object so we can destructure it later
      this.state = {
        movies: [],
        user: null,
        genres: [],
        directors: [],
        genMovie: [],
        dirMovie: []
      };
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        this.getGenres(accessToken);
        this.getDirectors(accessToken);
        this.getFavorites(accessToken);
      }
    }

    genremovies(nam) {
      let token = localStorage.getItem('token');
      axios.get(`https://moviecat0l0gue.herokuapp.com/genres/${nam}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          genMovie: response.data
        })
      })}

      
      dMovie(dnam) {
        let token = localStorage.getItem('token');
        axios.get(`https://moviecat0l0gue.herokuapp.com/directors/${dnam}`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            dirMovie: response.data
          })
        })}
       
    
  
    onLoggedIn(data) {
          console.log(data.user.Username)
            this.setState({
              user: data.user.Username
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user.Username);
            this.getMovies(data.token);
        }

    // update(data) {
    //   console.log(data + "is the username here!");
    //   this.setState({
    //     user: data
    //   })
    //   localStorage.removeItem("user")
    //   localStorage.setItem('user', data);
    // }

    
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

    getFavorites(token) {
    const user = localStorage.getItem('user');
    axios.get(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}
     })
    .then((response) => {
        const favorite = response.FavoriteMovies;
        console.log(favorite);
    })
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
    const { movies, user, genres, directors, genMovie, dirMovie} = this.state;
    const url = localStorage.getItem('user');
    return (
      <div className="SuperDiv">
        <Nav>
        <Nav.Item>
          <Nav.Link href="/login" >Movies</Nav.Link>
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
          <Nav.Item class= "dropdown">
            <Nav.Link href="/users/Profile/Favorite Movies">Favorite Movies</Nav.Link>
          </Nav.Item>
        </Nav>
      <Router>
        <Route path="/login" render={() => {
          if (!user) return <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)
        }} />
        <Route path="/Register" render={() => {return <Register/>;}}/>
        <Route path="/Genres" render={() => {
          return genres.map(g => <GenreCard genremovies={nam => this.genremovies(nam)} key={g._id} genres={g}/>);
          }}/>
        <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        <Route exact path="/Directors" render={() => {
          return directors.map(d => <DirectorCard dMovie={dnam => this.dMovie(dnam)} key={d._id} directors={d}/>)
        }}/>

        <Route exact path="/Director/:Director" render={() => {
          return dirMovie.map(dm => <DirMovieCard dMovie={dnam => this.dMovie(dnam)} key={dm._id}  dirMovie={dm}/>)
        }}/>
        <Route exact path="/Genre/:Genre" render={() => {
          return genMovie.map(gm => <GenMovieCard key={gm._id}  genMovie={gm}/>)
        }}/>
        <Route path='/users/Profile' render={() => {
          return <Profile getFavorites={(token) => this.update(this.getFavorites)}/>
        }} />
        
      </Router>     
      </div>
    );
  }}