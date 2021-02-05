import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class FavMovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { favMovie } = this.props;
    // A actual onclick function that is clicked on.

    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={favMovie.ImagePath} />
      <Card.Body>
        <Card.Title>{favMovie.Title}</Card.Title>
        <Card.Text>{favMovie.Description}</Card.Text>
        <Link to={`/movies/${favMovie._id}`}>
            <Button variant="link">Open</Button>
        </Link>
        {/* <Link to={`/users/Profile/Favorite`}>
            <Button variant="link">Back</Button>
        </Link> */}
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
    )
  }
}

FavMovieCard.propTypes = {
  favMovie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    // Genre: PropTypes.object,
    Director: PropTypes.object,
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
};