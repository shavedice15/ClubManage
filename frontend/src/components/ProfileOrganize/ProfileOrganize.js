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

import {auth} from '../../firebase';

class ProfileOrganize extends Component { 
  constructor(props) {
    super(props);
    this.state = {profile: [],
                  position: []};
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
          fetch('http://localhost:8080/organize/'+user.email)
              .then(response => response.json())
              .then(data => this.setState({ profile: data }));
          
          fetch('http://localhost:8080/organize/'+user.email)
              .then(response => response.json())
              .then(data => this.setState({ position: data.position }));
      }else{
          window.location = '/loginOrganization';
      }
    })  
  }

  async remove(organizeId) {
    await fetch(`http://localhost:8080/deleteOrganize/${organizeId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      auth.currentUser.delete().then(response => {
        auth.signOut()
        window.location = '/loginOrganization';
      })
      .catch(error => {
        console.log(error.message)
      })

    }).catch((error) => {
      console.log("Error"+ error);
    });
  }

    render() {
      const {profile,position} = this.state;
      return <div>
         <AppNavBarOrganization/>
      
          <Container>
         
          <form>
                            <fieldset className='my-fieldset'>
                            <legend className='legend' >Profile:</legend>
                                <div className="row" className='a'>
                                <AvForm className="col-md-8 mb-3" >
                                  <Label>ชื่อ-นามสกุล</Label><br/>
                                        <TextField name="name"
                                            defaultValue=" "
                                            value={profile.name}
                                            InputProps={{
                                                readOnly: true,
                                            }}   
                                            variant="outlined"
                                        />
                                    </AvForm>
                                    
                                     <AvForm className="col-md-8 mb-3" >
                                      <Label>เบอร์มือถือ</Label><br/>
                                        <TextField name="tell"
                                            defaultValue=" "
                                            value={profile.tell}
                                            InputProps={{
                                                readOnly: true,
                                            }}   
                                            variant="outlined"
                                        />
                                    </AvForm>
                                    
                                    <AvForm className="col-md-8 mb-3" >
                                      <Label>เกรดเฉลี่ย</Label><br/>
                                        <TextField name="grade"
                                            defaultValue=" "
                                            value={profile.grade}
                                            InputProps={{
                                                readOnly: true,
                                            }}   
                                            variant="outlined"
                                        />
                                    </AvForm>

                                    <AvForm className="col-md-8 mb-3" >
                                      <Label>ตำแหน่ง</Label><br/>
                                        <TextField name="position"
                                            defaultValue=" "
                                            value={position.position}
                                            InputProps={{
                                                readOnly: true,
                                            }}   
                                            variant="outlined"
                                        />
                                    </AvForm>
                                    
                                </div>
                            </fieldset>
                        </form>
                        <FormGroup style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Button style={{background: '#FFB6C1',color: '#000066'}}  tag={Link} to={"/EditProfileOrganize"}>แก้ไข</Button>
                            <Button style={{ background: '#FFB6C1', color:'#000066' }} onClick={() => this.remove(profile.id)}>ลบบัญชีผู้ใช้</Button>
                        </FormGroup>
          </Container> 
           
      </div>
    }
  }
  export default ProfileOrganize;
