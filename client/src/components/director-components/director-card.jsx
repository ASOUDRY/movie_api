import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../card-style/card-style.scss"

export class DirectorCard extends React.Component {
  render() {
    const { directorMovie } = this.props;
    return (
        <Card className="fl w-25 p-2 ml-5 mr-5 mb-4">
      <Card.Img className="movie-poster" src={directorMovie.ImagePath} />
      <Card.Body>
        <h5 className="card-title">{directorMovie.Title}</h5>
        <p  className="card-text">{directorMovie.Description}</p>
        <Link to={`/singlemovie/${directorMovie._id}`}>
            <Button variant="link">Open</Button>
        </Link>
        <Link to={`/Directors`}>
            <Button variant="link">Back</Button>
        </Link>
      </Card.Body>
      </Card>
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