import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

class CheckBudget extends Component {
  emptyItem = {
    nameId: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {clubName: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/Clubs')
      .then(response => response.json())
      .then(data => this.setState({clubName: data}));

  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
    console.log(item);
  }

    render() {
      const {clubName} = this.state;
      const {setItem} = this.state;
      const nameList = clubName.map(name => {
        return (
          <MenuItem value={name.clubId}>{name.clubName}</MenuItem>
        )
      });
    console.log(clubName);

      return <div>
          <AppNavbar/>
          <Container>
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
            <FormGroup className="col-md-4 mb-3" >
                  <InputLabel htmlFor="tag-helper">ชื่อชมรม</InputLabel>
                    <Select 
                      value={this.state.setItem.nameId}
                      onChange={this.handleChange}
                      style={{ width: '70%',  textAlign: 'center'}}
                      input={<OutlinedInput name="nameId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {nameList}
                    </Select>
                          
            </FormGroup>

            </div>
            <FormGroup>
                <Button style={{ background: '#000066',width: '15%' }} tag={Link} to={"/ShowDetail/"+setItem.nameId}>ค้นหา</Button>
            </FormGroup>
            </Form>
          </Container>
      </div>
    }
  }
  export default CheckBudget;