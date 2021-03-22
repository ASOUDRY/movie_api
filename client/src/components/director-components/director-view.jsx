
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

import './director-card.scss';

export class DirectorView extends React.Component {


  render() {
    const { directors } = this.props;
    const directorTag = directors.Itag
    console.log(directors)
    const directorName = directors.Name;
    console

    return (
      <div>
      <Card className="fl w-25 pl-5 ml-5 pr-5 mr-5 pb-5 mb-5 director-card">
        <Card.Body>
        <h5 className="card-title">{directorName}</h5>
       
        
        <p className="card-text">Born in {directors.Birth},  {directors.Bio}</p>
     
      <Link to={`/Director/${directorName}`}>
        <Button onClick={
          () => {
            console.log("clicked")
            this.props.directorProp(directorTag)
          }}
          >View Movies</Button>
        </Link>
      </Card.Body>
        
      
      </Card>
      </div>
    )
  }
}
 
DirectorView.propTypes = {
  directors: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: propTypes.string
  }).isRequired,
};