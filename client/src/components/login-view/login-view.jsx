import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Register } from '../register/register';
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  props.onLoggedIn(username);  
};

const goHere = () => {
  return <Register/>;
} 

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
       <button onClick={goHere}>Already Registered. Go Here</button>
       </Row>
      </Container>     
  );
}
