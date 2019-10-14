import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {auth} from './firebase';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {  profile: [],
                        badge:'',
                        lengthNews:'',
                        currentUser: null,
                     };
    this.post = this.post.bind(this);
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.setState({
            currentUser: user.email
          })
           fetch('http://localhost:8080/username/'+user.email)
                .then(response => response.json())
                .then(data => {

                    fetch('http://localhost:8080/allNews')
                        .then(response => response.json())
                        .then(data2 => {
                            if(data2.length < data.read){
                                fetch(`http://localhost:8080/editRead/${user.email}/${data2.length}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                    }).then(response => response.json()
                                    ).then(data => {
                                            console.log(data)
                                    }).catch((error) => {
                                        console.log("Error"+ error);
                                    });
                                this.setState({ badge: 0 })
                            }else if(data2.length > data.read || data2.length == data.read){
                                this.setState({ badge: data2.length-data.read })
                            }
                    });

                });
                
        }else{
            window.location = '/login';
        }
      })
    }

    post() {
        const {lengthNews,currentUser,badge} = this.state;
        if(badge == 0){
            window.location  = '/postnewsstudent';
        }else{
            fetch(`http://localhost:8080/editRead/${currentUser}/${lengthNews}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                }).then(response => response.json()
                ).then(data => {
                        console.log(data)
                        window.location  = '/postnewsstudent';
                }).catch((error) => {
                console.log("Error"+ error);
                });
        }
        
    }

    render() {
        console.log(this.state.badge)
          return (
            <div>
                <IconButton
                    color="inherit"
                    //onClick={this.post}
                    component={Link} to="/postnewsstudent"
                >
                    <Badge color="primary" badgeContent={this.state.badge}  >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </div>
          );
        }
}
export default Notification;