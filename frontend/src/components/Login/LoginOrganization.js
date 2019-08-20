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

import { authenticationService } from './AuthenticationService';

class LoginOrganization extends Component {
    emptyItem = {
        username: '',
        password: ''
      };

    constructor(props) {
        super(props);
        this.state = {  user: this.emptyItem,
                        getUser: [],
                        showPassword: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    login(){
      const {user} = this.state;
      const {getUser} = this.state;
      authenticationService.login(user.username, user.password)
      .then(
        user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
          this.setState({getUser: user});
        }/*,
        error => {
          setSubmitting(false);
          setStatus(error);
        }*/
      );
      if(getUser){
        window.location = '/CheckBudget';
      }
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const item = {...this.state.user};
        item[name] = value;
        this.setState({user: item});
        console.log(this.state.user);
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
        const {user} = this.state;
        const {showPassword} = this.state;
        return (
          <div>
            <AppBar
                position="fixed"
                style={{ background: '#FFB6C1' }}
            >
                <Toolbar>
                    <Typography variant="h6" style={{ color: '#000066', width: '90%' }} noWrap>
                        Club Management System
                    </Typography>
                    <div>
                      <Button style={{ background: '#000066', width: '150px' }} tag={Link} to={"/login"}>สำหรับนักศึกษา</Button>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Container>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop: '15%'}}>
                <TextField
                    label="Username"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="username"
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
                  <Button style={{ background: '#FFB6C1', color:'#000066' }} onClick={() => this.login()}>Login</Button>
              </FormGroup>
              <FormGroup style={{width: '10px'}} ></FormGroup>
              </form>
            </Container>
            
          </div>
        );
      }
}
export default LoginOrganization;