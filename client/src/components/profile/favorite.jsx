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
    // console.log(favorite);

    let removeable = favorite.Title

    
   
    return (
      //   // <Link to={`/singlemovie/${favorite.Title}/Favorite`}>
      //     <Card className="grow">
      //   {/* <Card.Head> */}
      //   <button type="button" class="btn-close" aria-label="Close"></button> 
      //   {/* </Card.Head> */}
            
      // <Card.Body>
      //   <h5 className="card-title">{favorite.Title}</h5>
      // </Card.Body>
      // </Card>
      // // </Link> 
      <div>
        <button onClick={() => {
          // console.log(this.movie);
          this.props.RemoveMe(removeable)
        } } >X</button>
      <Link to={`/singlemovie/${favorite.Title}/Favorite`}>
      <Card.Img className="image"  variant="top" src={favorite.Image}/>
        <h5 className="card-title">{favorite.Title}</h5>
      </Link>
      </div>
    )
  }
}

FavMovieCard.propTypes = {
  favorite: PropTypes.shape({
  }).isRequired,
};