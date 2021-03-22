import React from 'react';
import {Button, Card } from 'react-bootstrap';
import "../card-style/card-style.scss"
import { Link } from "react-router-dom";
import './movie-view.scss'
// The movie info that is accessed via the click
export class MovieView extends React.Component {
  render() {
    const { movie } = this.props;
  
    if (!movie) return null;

    return (
         <Card className=" fl w-20 p-2 ml-5 mr-5 mb-4 view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="BackButton">
        <Link to={`/Movies`}>
            <Button variant="link">Return</Button>
        </Link>
        </div>
       </Card>
  
    );
  }
}