import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export function Profile(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ favorite, setfavorite ] = useState('');
  const [ defavorite, setdefavorite ] = useState('');
  

  const Update = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
  }, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      const data = response.data.Username
      console.log(data);
      props.update(data)
      // localStorage.removeItem("user")
      // localStorage.setItem('user', data);
    })
    .catch(error => {
      console.log(error);
    })}

    const Clear = (e) => {
      // console.log(token);
      e.preventDefault();
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      // console.log(token);
      // window.localStorage.removeItem(token);
      // localStorage.clear;
      window.open('/login', '_self')
    }

    const AddMe = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      axios.get(`https://moviecat0l0gue.herokuapp.com/movies/${favorite}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        const user = localStorage.getItem('user')
        console.log(response.data);
        const Title = response.data.Title;
        const Id = response.data._id;
        console.log(Title);
        axios.post(`https://moviecat0l0gue.herokuapp.com/${user}/${Title}/${Id}`, {}, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
          console.log("successfully added")
        })
        .then(() => {
          props.getFavorites(token);
        })
        .catch(error => {
          console.log(error);
        })
      })
    }

    const RemoveMe = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      axios.get(`https://moviecat0l0gue.herokuapp.com/movies/${defavorite}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        const user = localStorage.getItem('user')
        console.log(response.data);
        const Title = response.data.Title;
        const Id = response.data._id;
        axios.post(`https://moviecat0l0gue.herokuapp.com/${user}/${Title}/${Id}/Remove`, {}, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
          console.log("successfully removed")
        })
        .then(() => {
          props.getFavorites(token);
        })
        .catch(error => {
          console.log(error);
        })
      })
    }
    
    const DeleteAccount = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user')
      axios.delete(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(() => {
        console.log("bye Felicia");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.open('/', '_self')
      })
      .catch(error => {
        console.log(error)
      })
    }

    return (
        <div>
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
        <Button variant="primary" type="submit" onClick={Clear}> Log Out! </Button>
      </Form>
      <Form>
        <Form.Group>
          <Form.Label>Type your favorite movie here! Than hit click to add it to your list.</Form.Label>
          <Form.Control type="text" placeholder="Enter the name of your movie" value={favorite} onChange={e => setfavorite(e.target.value)} />
          <Button variant="primary" type="submit" onClick={AddMe}> Add Me! </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>No longer a fan. Remove a movie from the list..</Form.Label>
          <Form.Control type="text" placeholder="Enter the name of your movie you wanna remove" value={defavorite} onChange={e => setdefavorite(e.target.value)} />
          <Button variant="primary" type="submit" onClick={RemoveMe}> Remove Me! </Button>
        </Form.Group>
        {/* <Form.Group>
          <Button variant="primary" type="submit" onClick={FavoriteMovies}>Favorite Movie</Button>
        </Form.Group> */}
        <Form.Label>Not a fan of the site? No problem.</Form.Label>
        <Button variant="primary" type="submit" onClick={DeleteAccount}> Delete Account </Button>
      </Form>
        </div>
    )
}