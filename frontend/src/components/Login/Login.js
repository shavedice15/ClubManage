import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Table, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {auth} from '../../firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
                        email: '',
                        password: '',
                        currentUser: null,
                        message: '',
                        showPassword: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.setState({
            currentUser: user.email
          })
          window.location = '/ProfileMember';
        }
      })

      

    }

    onSubmit = e => {
      e.preventDefault()
  
      const { email, password } = this.state

      fetch('http://localhost:8080/username/'+email)
        .then(response => response.json())
        .then(data => {
          auth
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            this.setState({
              currentUser: response.user.email
            })
            window.location = '/ProfileMember';
          })
          .catch(error => {
            alert(error.message)
            this.setState({
              message: error.message
            })
          })
        })
        .catch(error => {
          alert('ไม่พบ e-mail นี้')
        });
    }

    handleChange = e => {
      const { name, value } = e.target
  
      this.setState({
        [name]: value
      })
    }

    handleClickShowPassword() {
        const {showPassword} = this.state;
        this.setState({ showPassword: !showPassword });
        console.log(showPassword);
    };
    
    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    render() {
      console.log(this.state.currentUser)
      console.log(this.state.message)
        const {showPassword} = this.state;
        return (
          <div>
            <AppBar
                position="fixed"
                style={{ background: '#000066' }}
            >
                <Toolbar>
                    <Typography variant="h6" style={{ width: '90%'}} noWrap>
                        Club Management System
                    </Typography>
                    <div>
                      <Button style={{ background: '#FFB6C1', color:'#000066', width: '150px' }} tag={Link} to={"/loginOrganization"}>สำหรับองค์การ</Button>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Container>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop: '15%'}}>
                <TextField
                    label="E-mail"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="email"
                    style={{ width: '250px' }}
                />
              </form>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <TextField
                    label="Password"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="password"
                    style={{ width: '250px' }}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                    }}
                />
              </form>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'15px'}}>
              <FormGroup>
                  <Button style={{ background: '#000066' }} onClick={this.onSubmit}>Login</Button>
              </FormGroup>
              <FormGroup style={{width: '10px'}} ></FormGroup>
              <FormGroup>
                  <Button style={{ background: '#000066' }} tag={Link} to={"/Members"}>Signup</Button>
              </FormGroup>
              </form>
            </Container>
            
          </div>
        );
      }
}
export default Login;