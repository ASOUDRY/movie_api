import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import "../card-style/card-style.scss"

import { Link } from "react-router-dom";

export class GenreMovie extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { genreMovie } = this.props;

    return (
        <Card className="fl w-25 p-2 ml-5 mr-5 mb-4 view">
      <Card.Img className="movie-poster" variant="top" src={genreMovie.ImagePath} />
      <Card.Body>
        <h5 className="card-title">{genreMovie.Title}</h5>
        <p  className="card-text">{genreMovie.Description}</p>
        <Link to={`/singlemovie/${genreMovie._id}`}>
            <Button variant="link">Open</Button>
        </Link>
        <Link to={`/Genres`}>
            <Button variant="link">Back</Button>
        </Link>
      </Card.Body>
      </Card>
    )
  }
}

GenreMovie.propTypes = {
  genreMovie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    // Genre: PropTypes.object,
    Director: PropTypes.object,
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
};