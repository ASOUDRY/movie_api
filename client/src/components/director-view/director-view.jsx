import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class DirectorCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { directors } = this.props;
    const dnam = directors.Itag;
    console.log(dnam);
    const fetching = (e) => {
      console.log(dnam);
      e.preventDefault();
      // this.props.testing();
      this.props.dMovie(dnam)
      // this.props.dirMovies(dnam)
    }

    // A actual onclick function that is clicked on.
    return (
      <Container>
        <CardColumns>
        <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{directors.Name}</Card.Title>
        <Card.Text>{directors.Bio}</Card.Text>
        <Button onClick={fetching}>Loading</Button>
        <Link to={`/Director/${dnam}`}>
            <Button variant="link">Examples</Button>
        </Link>
      </Card.Body>
      </Card>
        </CardColumns>       
      </Container>
    )
  }
}

DirectorCard.propTypes = {
  directors: PropTypes.shape({
    Itag: PropTypes.string,
    Name: PropTypes.string,
    Bio: PropTypes.string,
  }).isRequired,
};