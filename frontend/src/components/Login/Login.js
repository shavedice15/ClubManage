import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Table, Button } from 'reactstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    emptyItem = {
        username: '',
        password: ''
      };

    constructor(props) {
        super(props);
        this.state = {  user: this.emptyItem,
                        showPassword: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
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
                style={{ background: '#000066' }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Club Management System
                    </Typography>
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
                  <Button style={{ background: '#000066' }} onClick={() => this.find()}>Login</Button>
              </FormGroup>
              <FormGroup style={{width: '10px'}} ></FormGroup>
              <FormGroup>
                  <Button style={{ background: '#000066' }} onClick={() => this.find()}>Signup</Button>
              </FormGroup>
              </form>
            </Container>
            
          </div>
        );
      }
}
export default Login;