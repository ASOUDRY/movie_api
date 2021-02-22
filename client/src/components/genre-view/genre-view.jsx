import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { genres } = this.props;
    const genreName = genres.Name;
    const fetching = (e) => {
      console.log(genreName);
      e.preventDefault();
      this.props.genreProp(genreName)
    }

    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{genres.Name}</Card.Title>
        <Card.Text>{genres.Description}</Card.Text>
        <Button onClick={fetching}>Loading</Button>
        <Link to={`/Genre/${genreName}`}>
            <Button variant="link">Examples</Button>
        </Link>
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
    )
  }
}

GenreView.propTypes = {
  genres: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
};