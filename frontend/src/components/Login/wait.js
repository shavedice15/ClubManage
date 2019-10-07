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

class wait extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        
    }

    componentDidMount() {
        auth.signOut()
        window.location = '/login';

    }
    

    render() {
        return (
          <div>
            
          </div>
        );
      }
}
export default wait;