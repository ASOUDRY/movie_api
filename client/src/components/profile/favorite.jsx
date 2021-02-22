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
    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{favoriteMovie.Title}</Card.Title>
        <Link to={`/singlemovie/${favoriteMovie.Title}/Favorite`}>
            <Button variant="link">Open</Button>
        </Link> 
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
    )
  }
}

FavMovieCard.propTypes = {
  favoriteMovie: PropTypes.shape({
    // Title: PropTypes.string,
    // Description: PropTypes.string,
    // Genre: PropTypes.object,
    // Director: PropTypes.object,
    // ImagePath: PropTypes.string,
    // Featured: PropTypes.bool
  }).isRequired,
};