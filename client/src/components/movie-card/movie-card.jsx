import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './movie-card.css';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;
    
    return (
    <Link to={`/singlemovie/${movie._id}`}>
<Card className=" fl w-25 p-2 ml-5 mr-5 mb-4 movie-card grow" >
  <Card.Img className="image"  variant="top" src={movie.ImagePath}/>
  <Card.Body>
    <h5 className="card-title">{movie.Title}</h5>
    <p className="card-text">{movie.Description}</p>
  </Card.Body>
  </Card>
    </Link>
    )
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    // Genre: PropTypes.object,
    Director: PropTypes.object,
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
};