import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import './favorite.scss';

export class FavMovieCard extends React.Component {
  render() {
    const { favorite } = this.props; 
  
    let removeable = favorite.Title

    return (
     <Card>
         <Card.Header>
         <button className="Button" onClick={
           () => { 
             console.log(this.movie); this.props.RemoveMe(removeable)
             } 
        } >X</button> 
         </Card.Header>
         <Link to={`/singlemovie/${favorite.Title}/Favorite`}>
         <Card.Img className="image"  src={favorite.Image}/>
         </Link>
     </Card>
    )
  }
}

FavMovieCard.propTypes = {
  favorite: PropTypes.shape({
  }).isRequired,
};