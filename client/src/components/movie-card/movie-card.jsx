import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col, CardColumns } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick} = this.props;
    // A actual onclick function that is clicked on.
    return (
      <Container>
        <Row>
          <Col>1</Col>
          <Col>2</Col>
          <Col>3</Col>
        </Row>
        <Row>
          <Col>4</Col>
          <Col>5</Col>
          <Col>6</Col>
        </Row>
        <Row>
          <Col>7</Col>
          <Col>8</Col>
          <Col>9</Col>
        </Row>
        <Row>
          <Col>10</Col>
          <Col>11</Col>
          <Col>12</Col>
        </Row>
      <CardColumns>
          <Card style={{ width: '16rem' }}>
              <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Description}</Card.Text>
                      <Button onClick={() => onClick(movie)} variant="link">Open</Button>
                    </Card.Body>
          </Card>
      </CardColumns>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.object,
    Director: PropTypes.object,
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func.isRequired
};