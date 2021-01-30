import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// import { Link } from "react-router-dom";

export function Profile() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  

  const Update = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(user);
    console.log(token);
    axios.put(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token} `},
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(() => {
      console.log("Updated");
    })
    .catch(error => {
      console.log(error);
    })}

    const test = (e) => {
      e.preventDefault();
      const test1 = window.localStorage.getItem('token');
      console.log(test1);
    }

    return (
        <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter new Username"  value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" placeholder="Enter new Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="Date" placeholder="Enter your date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={Update}> Submit </Button>
        <Button variant="primary" type="submit"> LogOut </Button>
        <Button variant="primary" type="submit" onClick={test}> Testing Button </Button>
      </Form>
    )
}