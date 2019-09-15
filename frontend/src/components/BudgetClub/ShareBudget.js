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
import AppNavBarOrganization from '../../AppNavBarOrganization';

class ShareBudget extends Component {
  emptyItem = {
    clubId: '',
    date: '',
    money: ''
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
  }

  async save() {
    const {setItem} = this.state;

    await fetch(`http://localhost:8080/shareMoney/${setItem.clubId}/${setItem.date}/${setItem.money}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => console.log(data),
            alert('บันทึกสำเร็จ'),
            window.location.reload())
      .catch((error) => {
      console.log("Error"+ error);
      alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
    });
  }

    render() {
      const {clubName} = this.state;
      const {setItem} = this.state;
      const nameList = clubName.map(name => {
        return (
          <MenuItem value={name.clubId}>{name.clubName}</MenuItem>
        )
      });
    console.log(setItem);

      return <div>
         <AppNavBarOrganization/>
      
          <Container>
         
          <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop: '5%'}}>
            <div className="row">
            <FormGroup className="col-md-4 mb-3" >
                  <InputLabel htmlFor="tag-helper">ชมรม</InputLabel>
                    <Select 
                      value={this.state.setItem.clubId}
                      onChange={this.handleChange}
                      style={{ width: '250px' }}
                      input={<OutlinedInput name="clubId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {nameList}
                    </Select>
                    <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
              <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div> 
                  <TextField style={{ width: '250px',paddingTop: '1%' }}
                  label="วันที่"
                  type="date"
                  value={this.state.setItem.date}
                  onChange={this.handleChange}
                  name="date"
                  InputLabelProps={{
                  shrink: true,
                  
                 }}
                /> 
                <form >
                <TextField  style={{ width: '250px',paddingTop: '2%' }}
                    label="งบประมาณ(บาท)"
                    value={this.state.setItem.money}
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="money"
                />
                <FormGroup  className="col-md-5 mb-3" >
                     <Button style={{marginLeft:50,background: '#FFB6C1',color: '#000066',justifyContent:'center',alignItems:'center'}}onClick={() => this.save()}>บันทึก</Button>
               </FormGroup> 
             </form>
            </FormGroup>
            </div>
            </Form>
          </Container> 
           
      </div>
    }
  }
  export default ShareBudget;
