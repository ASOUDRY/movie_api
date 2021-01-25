import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export function Register(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const Registration = (e) => {
    e.preventDefault();
    axios.post('https://moviecat0l0gue.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(function (response) {
      const data = response.data;
      console.log(data)
      props.onRegister(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
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
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="text" placeholder="Enter a email address please" value={email} onChange={e => setEmail(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="formBirthday">
      <Form.Label>Password</Form.Label>
      <Form.Control type="Date" placeholder="Enter your birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={Registration}>
      Submit
    </Button>
    <Button variant="primary" type="submit" onClick={
      window.open('/login', '_self')
    }>
      Already Registered? Click Here?
    </Button>
    
  </Form>
);
}