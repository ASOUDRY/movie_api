import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;
    
    return (
    <Link to={`/singlemovie/${movie._id}`}>
<div className=" fl w-25 p-2 ml-5 mr-5 mb-4 movie-card grow" >
  <Card.Img className="image"  variant="top" src={movie.ImagePath}/>
  <div className="card-body">
    <h5 className="card-title">{movie.Title}</h5>
    <p className="card-text">{movie.Description}</p>
  </div>
  </div>
    </Link>
    )
  }
}

// m-5

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