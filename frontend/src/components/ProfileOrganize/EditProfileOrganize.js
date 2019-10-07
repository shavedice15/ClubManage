import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'date-fns';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Divider from '@material-ui/core/Divider';
import {auth} from '../../firebase';

class InputOrgani extends Component {
  emptyItem = {
    tell:'',
    password:'',
    checkPassword: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {profile: [],
                  currentUser: null,
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })

        fetch('http://localhost:8080/organize/'+user.email)
            .then(response => response.json())
            .then(data => this.setState({ profile: data }));

      }else{
          window.location = '/loginOrganization';
      }
    }) 
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
  }

  async save() {
    const {setItem,currentUser} = this.state;
    if(setItem.tell != '' & setItem.password != '' & setItem.checkPassword != ''){
      if(setItem.password != setItem.checkPassword){
        alert('รหัสผ่านไม่ตรงกัน');

      }else if(setItem.password == setItem.checkPassword){
        await fetch(`http://localhost:8080/updateTelAndPasswordOr/${currentUser}/${setItem.tell}/${setItem.password}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          }).then(data => {
            auth.currentUser.updatePassword(setItem.password).then(() => {
              console.log(data)
              alert('บันทึกสำเร็จ')
              window.location = '/ProfileOrganize';
            }, (error) => {
                console.log(error.message)
            });
              
          }).catch((error) => {
            console.log("Error"+ error);
            alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
          });
      }
      
    }else if(setItem.tell != '' & setItem.password == '' & setItem.checkPassword == '') {
      await fetch(`http://localhost:8080/updateTelOr/${currentUser}/${setItem.tell}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          }).then(data => {
              console.log(data)
              alert('บันทึกสำเร็จ')
              window.location = '/ProfileOrganize';
          }).catch((error) => {
            console.log("Error"+ error);
            alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
          });
    }
    
  }

    render() {
      const {profile} = this.state;
      this.emptyItem.tell = profile.tell
      const {setItem} = this.state;
    console.log(setItem);

      return <div>
         <AppNavBarOrganization/>
      
          <Container>
         
          <form>
                            <fieldset className='my-fieldset'>
                            <legend className='legend' >แก้ไข:</legend>
                                <div className="row" className='a'>
                                <AvForm className="col-md-8 mb-3" >
                                        <AvField name="tell" label="เบอร์มือถือ" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: '^[0-9]{10}$' }
                                        }}
                                        value={setItem.tell || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    <Divider />
                                     <AvForm className="col-md-8 mb-3" >
                                        <AvField name="password" label="รหัสผ่านใหม่" type="text" errorMessage="Invalid name" 
                                     validate={{
                                             required: { value: true },
                                         pattern: { value: '^[0-9]' }
                                     }}
                                        value={setItem.password || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="checkPassword" label="ยืนยันรหัสผ่านใหม่" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: '^[0-9]' }
                                        }}
                                        value={setItem.checkPassword || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                   
                                </div>
                            </fieldset>
                        </form>
                        <FormGroup style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Button style={{marginLeft:40,background: '#FFB6C1',color: '#000066'}} onClick={() => this.save()}>บันทึก</Button>
                            <Button style={{marginLeft:40,background: '#FFB6C1',color: '#000066'}} tag={Link} to={"/ProfileOrganize"}>กลับ</Button>
                        </FormGroup>
          </Container> 
           
      </div>
    }
  }
  export default InputOrgani;
