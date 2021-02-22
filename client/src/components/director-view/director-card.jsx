import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class DirectorCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { directorMovie } = this.props;
    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={directorMovie.ImagePath} />
      <Card.Body>
        <Card.Title>{directorMovie.Title}</Card.Title>
        <Card.Text>{directorMovie.Description}</Card.Text>
        <Link to={`/singlemovie/${directorMovie._id}`}>
            <Button variant="link">Open</Button>
        </Link>
        <Link to={`/Directors`}>
            <Button variant="link">Back</Button>
        </Link>
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
    )
  }
}

DirectorCard.propTypes = {
  directorMovie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    // Genre: PropTypes.object,
    Director: PropTypes.object,
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
};