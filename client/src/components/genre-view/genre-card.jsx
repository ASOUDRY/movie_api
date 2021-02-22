import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';


import { Link } from "react-router-dom";

export class GenreMovie extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { genreMovie } = this.props;

    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={genreMovie.ImagePath} />
      <Card.Body>
        <Card.Title>{genreMovie.Title}</Card.Title>
        <Card.Text>{genreMovie.Description}</Card.Text>
        <Link to={`/singlemovie/${genreMovie._id}`}>
            <Button variant="link">Open</Button>
        </Link>
        <Link to={`/Genres`}>
            <Button variant="link">Back</Button>
        </Link>
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
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