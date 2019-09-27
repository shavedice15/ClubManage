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
import { AvForm, AvField } from 'availity-reactstrap-validation';

class EditProfile extends Component {
  emptyItem = {
  
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
    if(setItem.date != '' & setItem.money != '' & setItem.note != ''){
      await fetch(`http://localhost:8080/shareMoney/${setItem.clubId}/${setItem.date}/${setItem.money}/${setItem.note}`, {
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
    }else {
      alert('กรุณากรอกข้อมูลให้ครบ');
    }
    
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
         
          <form>
                            <fieldset className='my-fieldset'>
                            <legend className='legend' >Profile:</legend>
                                <div className="row" className='a'>
                                <AvForm className="col-md-8 mb-3" >
                                        <AvField name="password" label="ชื่อ-นามสกุล" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /\w*\s\w*/ }
                                        }}
                                        value={setItem.nameparent || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                     <AvForm className="col-md-8 mb-3" >
                                        <AvField name="newpassword" label="เบอร์มือถือ" type="text" errorMessage="Invalid name" 
                                     validate={{
                                             required: { value: true },
                                         pattern: { value: '^[0-9]{10}$' }
                                     }}
                                        value={setItem.tellparent || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="conferm" label="เกรดเฉลี่ย" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.motto || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="conferm" label="ตำแหน่ง" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.motto || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                </div>
                            </fieldset>
                        </form>
                        <FormGroup style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Button style={{background: '#FFB6C1',color: '#000066'}} type="submit">แก้ไข</Button>
                           
                        </FormGroup>
          </Container> 
           
      </div>
    }
  }
  export default EditProfile;
