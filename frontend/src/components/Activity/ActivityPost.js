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


class ActivityPost extends Component {
  emptyItem = {
    
  };
  
  constructor(props) {
    super(props);
    this.state = {club: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
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
      const {club} = this.state;
      const {setItem} = this.state;
      
    console.log(club);

      return <div>
         <AppNavbar/>
      
          <Container>
         
          <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <FormGroup className="col-md-4 mb-3">
            <TextField  style={{ width: '250px' }}
                    label="ชื่อกิจกรรม"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="income"
                /> 
                  <TextField style={{ width: '250px',paddingTop: '1%'}}
                  id="date"
                  label="วันที่" 
                  type="date"
                  onChange={this.handleChange}
                  name="date"
                  InputLabelProps={{
                  shrink: true,
                 
                 }}
                /> 
                 <TextField style={{ width: '250px',paddingTop: '1%'}}
                  id="date"
                  label="ถึงวันที่" 
                  type="date"
                  onChange={this.handleChange}
                  name="date"
                  InputLabelProps={{
                  shrink: true,
                 
                 }}
                /> 
              
                <form >
                <TextField style={{width: '250px'}}
                     id="time"
                    label="เวลา"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                    shrink: true,
                 }}
                 inputProps={{
                     step: 300, // 5 min
                     }}
                />
                 <TextField style={{width: '250px'}}
                     id="time"
                    label="ถึงเวลา"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                    shrink: true,
                 }}
                 inputProps={{
                     step: 300, // 5 min
                     }}
                 />
                </form>
                <InputLabel htmlFor="tag-helper" style={{paddingTop: '2%'}}>ความเป็นส่วนตัว</InputLabel>
                    <Select 
                      value={this.state.setItem.clubId}
                      onChange={this.handleChange}
                      style={{ width: '250px' }}
                      input={<OutlinedInput name="clubId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                     {/** {nameList} */}
                    </Select>
                <TextField style={{ width: '250px',paddingTop: '2%'}}
                      label="รายละเอียด"
                      multiline
                      rows="5"
                      defaultValue=' '
                      value={this.state.setItem.detail}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="detail"
                  />
                  <Button style={{marginLeft:'85px',width: '100px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}}>โพสต์</Button>
                  
                
       
            </FormGroup>
            </div>
            </Form>
          </Container> 
           
      </div>
    }
  }
  export default ActivityPost;
