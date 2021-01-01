import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
    constructor() {
      // Call the superclass constructor
      // so React can initialize it
      super();
  
      // Initialize the state to an empty object so we can destructure it later
      this.state = {};
    }

    componentDidMount() {
        axios.get('https://evening-woodland-79512.herokuapp.com/movies')
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
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
     { movies.map(movie => (
       <div className="movie-card" key={movie._id}>{movie.Title}</div>
     ))}
     </div>
    );
  }
}