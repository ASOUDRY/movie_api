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
   
    const fetching = (e) => {
      e.preventDefault();
      this.props.directorProp(directorTag)
    //   console.log(directorTag)
    //   // window.open('/client/Director/Yuasa', '_self')
    //   // link these two functions. It's needed
    }

    // console.log(this.props.directors);

    // A actual onclick function that is clicked on.
    return (
     
      <Card className="fl w-50 pa2" >
      <Card.Body>
        <h5 className="card-title">{directors.Name}</h5>
        <p className="card-text">{directors.Bio}</p>
        {/* <Button onClick={fetching}>View Movies</Button> */}
        <Link to={`/Director/${directorTag}`}>
        <Button onClick={
          () => {
            this.props.directorProp(directorTag)
          }}
        >View Movies</Button>
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