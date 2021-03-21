
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
// import './genre-view.scss';

export class DirectorView extends React.Component {

  directorProp(directorTag) {
    // console.log(directorTag)
    let token = localStorage.getItem('token')
    // let directors = []
    // console.log(token);
    axios.get(`https://moviecat0l0gue.herokuapp.com/directors/${directorTag}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // console.log(response.data);
      let test = "test";
      console.log(test);
      // this.props.Upward(test);
    })
  }

  test() {
    test = this.test
    this.props.test(test);
  }
  
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { director } = this.props;
    const directorTag = director.DTag
    const directorName = director.Name;

    return (
      <div>
      <Card className="fl w-50 pa2" >
      <Card.Body>
        <h5 className="card-title">{directorName}</h5>
        <p className="card-text">{director.Description}</p>
        {/* <Link to={`/Director/${directorName}`}> */}
        {/* <Button onClick={
          () => {
            // props.testingFile()
            // this.directorProp(director.Itag)
            this.test()
            // console.log(this.state.directorMovie);
          }}
          >View Movies</Button> */}
        {/* </Link> */}
        <Button>View Movies</Button>
      </Card.Body>
      </Card>
      </div>
    )
  }
}
 
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
  }).isRequired,
};