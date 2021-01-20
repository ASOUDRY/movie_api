import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       axios.post('https://moviecat0l0gue.herokuapp.com/access', {
//       Username: username,
//       Password: password
//       })
//       .then(response => {
//         console.log(username, password);
//         const data = response.data;
//         props.onLoggedIn(data);
//       })
//       .catch(e => {
//         console.log("no such user")
//       })
// };


const handleSubmit = (e) => {
  e.preventDefault();
  axios.post(`https://moviecat0l0gue.herokuapp.com/access`, {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
  console.log('no user found')
  });
};


  return (
    <Container>
      <Row>
      <form>
       <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </label>
        </form>
        </Row>
        <Row>
        <form>
       <label>
        Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        </form>
        </Row>
         <Row>
       <button type="button" onClick={handleSubmit}>Submit</button>
       </Row>
       <Row>
       <button>Haven't Registered. Go Here</button>
       </Row>
      </Container>     
  );
}
