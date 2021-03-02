import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class FavMovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { favorite } = this.props; 
    console.log(favorite);
    console.log("can you see this 2 Electric Bogoloo!");
    return (
      <Card className="grow">
      <Card.Body>
        <h5 className="card-title">{favorite.Title}</h5>
        <Link to={`/singlemovie/${favorite.Title}/Favorite`}>
            <Button variant="link">Open</Button>
        </Link> 
      </Card.Body>
      </Card>
    )
  }
}

FavMovieCard.propTypes = {
  favorite: PropTypes.shape({
  }).isRequired,
};