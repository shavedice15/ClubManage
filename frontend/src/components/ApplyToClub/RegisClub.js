import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
}));

class RegisClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}));
  }

  render() {
    const {club} = this.state;
    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <TextField
                    label="ชื่อชมรม"
                    defaultValue=" "
                    value = {club.clubName}
                    className={useStyles.textField}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}          
                    variant="outlined"
                />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <TextField
                    id="outlined-required"
                    label="เหตุผลที่อยากเข้าชมรม"
                    multiline
                    rows="10"
                    defaultValue=" "
                    className={useStyles.textField}
                    margin="normal"    
                    variant="outlined"
                    style={{ width: '80%'}}
                />
            </div>
            <FormGroup></FormGroup>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Button style={{ background: '#000066' ,width: '10%'}} type="submit" tag={Link} to={"/RegisClub"}>ส่ง</Button>
            </div>
          </form>
        </Container>
        
      </div>
    );
  }
}

export default RegisClub;