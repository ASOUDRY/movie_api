import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
  
    const { genres } = this.props;
    const genreName = genres.Name;
   
    return (
      <div>
      
      <Card className="fl w-third pl-5 ml-5 pr-5 mr-5 pb-5 mb-5 genre-card" >
      <Card.Body>
        <h5 className="card-title">{genres.Name}</h5>
        <p className="card-text">{genres.Description}</p>
        <Link to={`/Genre/${genreName}`}>
        <Button onClick={
          () => {
            this.props.genreProp(genreName)
          }}
          >View Movies</Button>
        </Link>
      </Card.Body>
      </Card>
      </div>
    )
  }
}

GenreView.propTypes = {
  genres: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
};