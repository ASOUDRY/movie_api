import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class GenreCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { genres } = this.props;

    const nam = genres.Name;
 

    const fetching = (e) => {
      console.log(nam);
      e.preventDefault();
      this.props.genremovies(nam);
    }

    // A actual onclick function that is clicked on.
    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{genres.Name}</Card.Title>
        <Card.Text>{genres.Description}</Card.Text>
        <Button onClick={fetching}>Loading</Button>
        <Link to={`/Genres/Test`}>
            <Button variant="link">Examples</Button>
        </Link>
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
    )
  }
}

GenreCard.propTypes = {
  genres: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
};