import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import { LoginView } from '../login-view/login-view';
import { Register } from '../register/register';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view';
import { Profile } from '../profile/profile';
import { LinkContainer } from "react-router-bootstrap";

export class MainView extends React.Component {
    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();
  
      // Initialize the state to an empty object so we can destructure it later
      this.state = {
        movies: [],
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
          console.log(data.user.Username)
            this.setState({
              user: data.user.Username
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user.Username);
            this.getMovies(data.token);
        }

    update(data) {
      console.log(data + "is the username here!");
      this.setState({
        user: data
      })
      localStorage.removeItem("user")
      localStorage.setItem('user', data);
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

    const url = localStorage.getItem('user')
    console.log(url);

    // const userId = localStorage.getItem('user');
    console.log(user);
    return (
      <div className="SuperDiv">
        <Nav activeKey={window.location.pathname} onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
          <Nav.Item>
          <Nav.Link href="/login" >Movies</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Director</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Genre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/users/Profile">Profile</Nav.Link>
          </Nav.Item>
       </Nav>
      <Router>
        <div className="main-view">
        <Route path="/login" render={() => {
          if (!user) return <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)
        }} />
        <Route path="/Register" render={() => {return <Register/>;}}/>
        <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        <Route path='/users/Profile' render={() => {
          return <Profile update={(data) => this.update(data)}/>
        }} />
        </div>
      </Router>     

      </div>
         
    );
  }}