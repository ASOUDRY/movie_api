import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const alternate = (e) => {
    e.preventDefault();
    window.open('/client/Register', '_self')
  }
  
  const handleSubmit = (e) => {
  e.preventDefault();
  axios.post(`https://moviecat0l0gue.herokuapp.com/login`, {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data
    props.onLoggedIn(data);
    window.open('/client/Movies', '_self')
  })
  .catch(function (error) {
    console.log(error);
  });
};

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
      <Button variant="primary" type="submit" 
      onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="primary" type="submit" onClick={alternate}>
      Not Registered yet? Go here!
    </Button>
    </Form>
  );
}
