import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import { Container, Row } from 'react-bootstrap';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('https://moviecat0l0gue.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    console.log(data)
    // props.onLoggedIn(data);
  })
  .catch(e => {
  console.log('no user found')
  });
};

// const handleSubmit = (e) => {
//   e.preventDefault();
// console.log(username, password);
// /* Send a request to the server for authentication */
// /* then call props.onLoggedIn(username) */
// props.onLoggedIn(username);  
// };

  return (


    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
    </Form>


    // <Container>
    //   <Row>
    //   <form>
    //    <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
    //     </label>
    //     </form>
    //     </Row>
    //     <Row>
    //     <form>
    //    <label>
    //     Password:
    //     <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
    //     </label>
    //     </form>
    //     </Row>
    //      <Row>
    //    <button type="button" onClick={handleSubmit}>Submit</button>
    //    </Row>
    //    <Row>
    //    <button>Haven't Registered. Go Here</button>
    //    </Row>
    //   </Container>     
  );
}
