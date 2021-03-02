import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import { FavMovieCard } from '../profile/favorite.jsx';
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor(props) {
       super(props)

      this.Username = "",
      this.Password = "",
      this.Email = "",
      this.Birthday = "",
      this.Movie = ""

      this.state = {
        favorite: [],
      };

    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      this.getFavorites(accessToken);
    }
   
    getFavorites(token) {
      const user = localStorage.getItem('user');
      axios.get(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}`}
              })
              .then((response) => {
                this.setState({
                  favorite: response.data[0].FavoriteMovies
                })
                console.log(this.state.favorite)
     })
    }
    
    
    setUsername(input) {
        this.Username = input;
    }
    
    setPassword(input) {
        this.Password = input;
    }
    
    setEmail(input) {
        this.Email = input;
    }
    
    setBirthday(input) {
        this.Birthday = input;
    }

    setMovie(input) {
      this.Movie = input;
    }

    profileUpdate() {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.put(`https://moviecat0l0gue.herokuapp.com/users/${user}`, {
          Username: this.Username,
          Password: this.Password,
          Email: this.Email,
          Birthday: this.Birthday
      }, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          console.log(response)
          const username = response.data.Username
          console.log(username);
          this.props.update(username)
        })
        .catch(error => {
          console.log(error);
        })}

    logOut() {
          // console.log(token);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");
          // console.log(token);
          // window.localStorage.removeItem(token);
          // localStorage.clear;
          window.open('/login', '_self')
    }
    
    AddMe() {
          let favorite = this.Movie;
          console.log(favorite);
          const token = localStorage.getItem('token');
          axios.get(`https://moviecat0l0gue.herokuapp.com/movies/${favorite}`, {
            headers: { Authorization: `Bearer ${token}`}
          })
          .then((response) => {
            const user = localStorage.getItem('user')
            console.log(response.data);
            let test = response.data;
            console.log(test);
            const Title = response.data.Title;
            const Id = response.data._id;
            console.log(Title);
            axios.post(`https://moviecat0l0gue.herokuapp.com/${user}/${Title}/${Id}`, {}, {
              headers: { Authorization: `Bearer ${token}`}
            })
            .then(() => {
              console.log(response.data);
              console.log("successfully added")
            })
            .then(() => {
              console.log(token);
              this.getFavorites(token);
            })
            .catch(error => {
              console.log(error);
            })
          })
    }
    
    RemoveMe () {
          let defavorite = this.Movie
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
              this.getFavorites(token);
            })
            .catch(error => {
              console.log(error);
            })
          })
    }
        
    DeleteAccount ()  {
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

  
render() {

  const { favorite } = this.state;
  console.log(favorite);
  // console.log(favorite[0].Title);
    return (
        <div>
         
         <div className="cardo">
          {
          favorite.map(input => <FavMovieCard key={input.Id} favorite={input} />)
          }   
          </div>   
          
          <div>
          <Form>
          <Form.Label> Update your account Information</Form.Label>
               <Form.Group>
                 <Form.Label>Username</Form.Label>
                 <Form.Control type="text" placeholder="Enter new Username"  onChange={e => this.setUsername(e.target.value)} />
               </Form.Group>
               <Form.Group>
                 <Form.Label>Password</Form.Label>
                 <Form.Control type="Password" placeholder="Enter new Password"  onChange={e => this.setPassword(e.target.value)} />
               </Form.Group>
               <Form.Group>
                 <Form.Label>Email address</Form.Label>
                 <Form.Control type="email" placeholder="Enter email"  onChange={e => this.setEmail(e.target.value)} />
               </Form.Group>
               <Form.Group>
                 <Form.Label>Birthday</Form.Label>
                 <Form.Control type="Date" placeholder="Enter your date" onChange={e => this.setBirthday(e.target.value)} />
               </Form.Group>
               <Form.Group>
               </Form.Group>
               <Button variant="primary" onClick={() => this.profileUpdate(this.Username, this.Password, this.Email, this.Birthday)}> Update </Button>
               <Button variant="primary" > Click Me </Button>
              
             </Form>
             <Form>
               <Form.Group>
                 <Form.Label>Want to keep track of your favorite Movies? </Form.Label>
                 <Form.Control type="text" placeholder="Type your favorite movie here! Than hit click to add it to your list."  onChange={e => this.setMovie(e.target.value)} />
                 <Form.Control type="text" placeholder="Change your mind about a movie? No problem just type the name here and click the remove button to remove it from the list."  onChange={e => this.setMovie(e.target.value)} />
                 <Button variant="primary" onClick={() => this.AddMe(this.Movie)}> Add </Button>
                 <Button variant="primary" onClick={() => this.RemoveMe(this.Movie)}> Remove </Button>
               </Form.Group>
             </Form>

           


             <Form>
               <Form.Group>
               <Form.Label>Done for Now? Click here to Logout.</Form.Label>
               <Button variant="primary" onClick={() => this.logOut()}> Log Out! </Button>
               </Form.Group>
               <Form.Group>
                 <Form.Label> Or click here to delete your account.</Form.Label>
                 <Button variant="primary"  onClick={() => this.DeleteAccount()}> Delete Account </Button>
               </Form.Group>
             </Form>
          </div>

           
         </div>
    )
}
}