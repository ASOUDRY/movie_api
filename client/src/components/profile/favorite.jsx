import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class FavMovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { favoriteMovie } = this.props; 
    console.log("can you see this 2 Electric Bogoloo!");
    return (
      <Card className="fl w-50 pa2">
      <Card.Body>
        <h5 className="card-title">{favoriteMovie.Title}</h5>
        <Link to={`/singlemovie/${favoriteMovie.Title}/Favorite`}>
            <Button variant="link">Open</Button>
        </Link> 
      </Card.Body>
      </Card>
    )
  }
}

FavMovieCard.propTypes = {
  favoriteMovie: PropTypes.shape({
  }).isRequired,
};