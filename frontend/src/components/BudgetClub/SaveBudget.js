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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

class SaveBudget extends Component {
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
    fetch('http://localhost:8080/api/clubs')
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
         
          <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <FormGroup className="col-md-4 mb-3">
                  <TextField style={{ width: '250px',paddingTop: '1%'}}
                  id="date"
                  label="วันที่" 
                  type="date"
                  onChange={this.handleChange}
                  name="startDate"
                  InputLabelProps={{
                  shrink: true,
                 
                 }}
                /> 
                <form >
                <TextField  style={{ width: '250px',paddingTop: '2%' }}
                    label="รายรับ(บาท)"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="budget"
                   
                />
                <TextField  style={{ width: '250px',paddingTop: '2%'}}
                    label="รายจ่าย(บาท)"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="budget"  
                /> <Button style={{width: '100px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}}onClick={() => this.save()}>บันทึก</Button>
                   <Button style={{width: '110px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}}>รายละเอียด</Button>
                
             </form>
            </FormGroup>
            </div>
            </Form>
          </Container> 
           
      </div>
    }
  }
  export default SaveBudget;
