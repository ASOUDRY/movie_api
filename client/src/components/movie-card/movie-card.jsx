import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, CardColumns } from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movies, movie, onClick} = this.props;
    // A actual onclick function that is clicked on.
    return (
      <Container>
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

     
    
    )
  }
}
//      {
//       movies.map(movie => (
//         <CardColumns>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//     <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//     <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//     <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         <Card>
//           <Card.Body>
//           <Card.Title>{movie.Title}</Card.Title>
//               <Card.Text>{movie.Description}</Card.Text>
//               <Button onClick={() => onClick(movie)} variant="link">Open</Button>
//           </Card.Body>
//         </Card>
//         </CardColumns>
//       ))
//     }
//     )
//   }
// }


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