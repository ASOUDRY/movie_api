import React from 'react';
import Button from 'react-bootstrap/Button';

// The movie info that is accessed via the click
export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;
  
    if (!movie) return null;

    return (
      <div className="movie-view">
        {/* keeping it commented out in case I need to add image */}
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="BackButton">
          <Button onClick = {() => window.open("mainView", "_self")}>Back to List</Button>
        </div>
       </div>
    );
  }
}