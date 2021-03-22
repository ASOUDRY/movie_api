import React from 'react';
import axios from 'axios';
import { FavMovieCard } from '../profile/favorite.jsx';
import './profile-view.scss';
import { Modal, Button, Card, Form } from 'react-bootstrap/'

export class ProfileView extends React.Component {
    constructor(props) {
       super(props)

      this.Username = "",
      this.Password = "",
      this.Email = "",
      this.Birthday = "",
      this.Movie = ""

      this.state = {
        info : [],
        favorite: [],
        show: false
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
                  info: response.data[0],
                  favorite: response.data[0].FavoriteMovies
        })
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

    handleModal(e) {
      // e.preventDefault();
     this.setState({show: true})
      console.log(this.state.show)
    }

    close() {
      this.setState({show:false})
    }

    logOut() {
          // console.log(token);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");
          // console.log(token);
          // window.localStorage.removeItem(token);
          // localStorage.clear;
          window.open('/client/login', '_self')
    }
    
    // Investigate why empty Bracket is needed
    AddMe() {
      console.log("Boom")
          let favorite = this.Movie;
          const token = localStorage.getItem('token');
          axios.get(`https://moviecat0l0gue.herokuapp.com/movies/${favorite}`, 
          { headers: { Authorization: `Bearer ${token}`}
        })
          .then((response) => {
          const user = localStorage.getItem('user')
          const Title = response.data.Title;
          const Id = response.data._id;
          const Image = response.data.FavImage
          axios.post(`https://moviecat0l0gue.herokuapp.com/${user}/${Title}/${Id}/${Image}`, {}, {headers: {Authorization: `Bearer ${token}`}})
          .then(() => {
              this.getFavorites(token);
            })
            .catch(error => {
              console.log(error);
            })
          })
    }
    
    RemoveMe (removeable) {
      console.log("You have been clicked!")
          const token = localStorage.getItem('token');
          axios.get(`https://moviecat0l0gue.herokuapp.com/movies/${removeable}`, {
            headers: { Authorization: `Bearer ${token}`}
          })
          .then((response) => {
            const user = localStorage.getItem('user')
            const Title = response.data.Title;
            const Id = response.data._id;
            const Image = response.data.FavImage
            console.log(token);
            axios.post(`https://moviecat0l0gue.herokuapp.com/${user}/${Title}/${Id}/${Image}/Remove`, {}, {
              headers: { Authorization: `Bearer ${token}`}
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
            window.open('/client', '_self')
          })
          .catch(error => {
            console.log(error)
          })
    }

render() {
  const { favorite, info } = this.state;
  const user = localStorage.getItem('user')
    return (
      <div>
        <Card className="w-40 ml-2 pr-4 pb-4">
            <Card.Body> 
            <Button className="But" onClick={() => this.handleModal()}>Edit your Account.</Button>
            <h5>Username:</h5>
            <h6>{user}</h6>
            <h5>Email:</h5>
            <h6>{info.Email}</h6>
            <div className="But" >
            <Button variant="primary" onClick={() => this.logOut()}> Log Out! </Button>
            <Button   variant="secondary"  onClick={() => this.DeleteAccount()}> Delete Account </Button>
            </div>
            </Card.Body>
          </Card>
         
         <Modal show={this.state.show} onHide={() => this.close()} >
           <Modal.Body>
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
             </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={() => this.close()} >Close</Button>
           </Modal.Footer>
         </Modal>
      <div className="top">
     
      <div className="form">
      {/* <h5 >Favorite Movies</h5> */}
      <Form.Control className="w-90" type="text" placeholder="Enter the name of your favorite Movie here." onChange={e => this.setMovie(e.target.value)} />
      <Button variant="primary" onClick={() => this.AddMe(this.Movie)}> Add </Button>   
      </div>   
      </div>
        
      <div className="cardo">{
            favorite.map(input => <FavMovieCard RemoveMe={removeable => this.RemoveMe(removeable)} key={input.Id} favorite={input} />)
            }   
      </div> 
      </div>         
    )
  }
}