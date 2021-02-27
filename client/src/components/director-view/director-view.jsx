import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { directors } = this.props;
    const directorTag = directors.Itag;
    console.log(directorTag);
    const fetching = (e) => {
      console.log(directorTag);
      e.preventDefault();
      this.props.directorProp(directorTag)
    }

    // A actual onclick function that is clicked on.
    return (
      <Card className="fl w-50 pa2" >
      <Card.Body>
        <h5 className="card-title">{directors.Name}</h5>
        <p className="card-text">{directors.Bio}</p>
        <Button onClick={fetching}>Loading</Button>
        <Link to={`/Director/${directorTag}`}>
            <Button variant="link">Examples</Button>
        </Link>
      </Card.Body>
      </Card>
    )
  }
}

DirectorView.propTypes = {
  directors: PropTypes.shape({
    Itag: PropTypes.string,
    Name: PropTypes.string,
    Bio: PropTypes.string,
  }).isRequired,
};