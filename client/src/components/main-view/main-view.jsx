import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import { LoginView } from '../login-view/login-view';
import { Register } from '../register/register';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view';
import { Profile } from '../profile/profile.jsx';
import { FavMovieCard } from '../profile/favorite.jsx'
import { GenreCard } from '../genre-view/genre-view.jsx';
import { GenMovieCard } from '../genre-view/genMovie-card.jsx';
import { DirectorCard} from '../director-view/director-view.jsx';
import { DirMovieCard} from '../director-view/dirMovie-card.jsx';
import MoviesList from '../movies-list/movies-list';

import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions'

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
        dirMovie: [],
        favMovie: [],
        list: []
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
    // let counter = this.state.count
    const user = localStorage.getItem('user');
    axios.get(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}
     })
    .then((response) => {
      console.log(response.data[0].FavoriteMovies)
      this.setState({
        favMovie: response.data[0].FavoriteMovies
      })
      // let favorite = response.data[0].FavoriteMovies
      // this.props.favorite = "test"
      // this.props.genres = response.data[0].FavoriteMovies;
      // console.log(favorite);
      }
      )
    }    
    
    getMovies(token) {
      axios.get('https://moviecat0l0gue.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
        .then(response => {
          this.props.setMovies(response.data);
          // new code line
        
        // Assign the result to the state
        // console.log(response.data)
        // this.setState({ 
        //   movies: response.data 
        // });
      })
        .catch(function (error) {
          console.log(error);
      });
    }
      render() {

    // Two new let variables
    let { movies } = this.props;
    let { user } = this.state;

    

    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { genres, directors, genMovie, dirMovie, favMovie} = this.state;
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
          <Nav.Item>
            <Nav.Link href="/favorite">Favorite Movies</Nav.Link>
          </Nav.Item>
        </Nav>
      <Router>
        <Route path="/" render={() => {
           if (!user) return <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
          // return movies.map(m => <MovieCard key={m._id} movie={m}/>)
        }} />
         <Route path="/movies" render={() => {
            return <MoviesList movies={movies}/>;
          // return movies.map(m => <MovieCard key={m._id} movie={m}/>)
        }} />
        <Route path="/Register" render={() => {return <Register/>;}}/>
        <Route path="/Genres" render={() => {
          return genres.map(g => <GenreCard genremovies={nam => this.genremovies(nam)} key={g._id} genres={g}/>);
          }}/>
        <Route exact path="/singlemovie/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>


        <Route exact path="/singlemovie/:movieTitle/Favorite" render={({match}) => <MovieView movie={movies.find(m => m.Title === match.params.movieTitle)}/>}/>

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
          return <Profile getFavorites={(token) => this.getFavorites(token)}/>
        }}/>
        
        <Route path='/favorite' render={() => {
          return favMovie.map(fm => <FavMovieCard key={fm._id} favMovie={fm} />)
          // return favMovie.map(fm => <FavMovieCard key={fm._id} favMovie={fm}/>)
        }} />
      </Router>     
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);



