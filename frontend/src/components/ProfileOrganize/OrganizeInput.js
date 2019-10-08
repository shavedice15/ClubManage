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
import Select from '@material-ui/core/Select';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {auth} from '../../firebase';
const useStyles = makeStyles(theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
  },
}));

class OrganizeInput extends Component {
  emptyItem = {
    username:'',
    password:'',
    checkPassword:'',
    name:'',
    tel:'',
    grade:'',
    positionId: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {position: [],
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
      }else{
          window.location = '/loginOrganization';
      }
    }) 

    fetch('http://localhost:8080/orPositions')
      .then(response => response.json())
      .then(data => this.setState({position: data}));
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
    if(setItem.username != '' & setItem.password != '' & setItem.checkPassword != '' & setItem.name != '' & setItem.tel != '' & setItem.grade != '' & setItem.positionId != ''){
      if(setItem.password == setItem.checkPassword){
        await fetch(`http://localhost:8080/addOrganize/${setItem.username}/${setItem.password}/${setItem.name}/${setItem.tel}/${setItem.grade}/${setItem.positionId}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          }).then(data => {
              auth.createUserWithEmailAndPassword(setItem.username, setItem.password).then(() => {
                console.log(data)
                alert('บันทึกสำเร็จ')
                window.location.reload()
              }, (error) => {
                  console.log(error.message)
              });
              
          }).catch((error) => {
            console.log("Error"+ error);
            alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
          });
      }else {
        alert('password ไม่ตรงกัน');
      }
      
    }else {
      alert('กรุณากรอกข้อมูลให้ครบ');
    }
    
  }

    render() {
      const {position} = this.state;
      const {setItem} = this.state;
      console.log(position)
      const positionList = position.map(position => {
        return (
          <MenuItem value={position.id}>{position.position}</MenuItem>
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
                                        <AvField name="name" label="ชื่อ-นามสกุล" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /\w*\s\w*/ }
                                        }}
                                        value={setItem.name || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                     <AvForm className="col-md-8 mb-3" >
                                        <AvField name="tel" label="เบอร์มือถือ" type="text" errorMessage="Invalid name" 
                                     validate={{
                                             required: { value: true },
                                         pattern: { value: '^[0-9]{10}$' }
                                     }}
                                        value={setItem.tel || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="grade" label="เกรดเฉลี่ย" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.grade || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                    <FormGroup className="col-md-8 mb-3">
                                        <InputLabel htmlFor="tag-helper" style={{color: '#000066'}}>ตำแหน่ง</InputLabel>
                                        <Select placeholder="ตำแหน่ง"
                                            value={this.state.setItem.positionId}
                                            onChange={this.handleChange}
                                            style={{ width: '100%', textAlign: 'center' }}
                                            input={<OutlinedInput name="positionId"/>}
                                          >
                                            {positionList}
                                        </Select>
                                    </FormGroup>

                                   
                                       <AvForm className="col-md-8 mb-3" >
                                        <AvField name="username" label="E-mail:" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /\w*\s\w*/ }
                                        }}
                                        value={setItem.username || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                     <AvForm className="col-md-8 mb-3" >
                                        <AvField name="password" label="รหัสผ่าน" type="text" errorMessage="Invalid name" 
                                     validate={{
                                             required: { value: true },
                                         pattern: { value: '^[0-9]{10}$' }
                                     }}
                                        value={setItem.password || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="checkPassword" label="ยืนยันรหัสผ่าน" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.checkPassword || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                   
                               
                                    </div>
                            </fieldset>
                        </form>
                        <FormGroup style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Button style={{background: '#FFB6C1',color: '#000066'}} onClick={() => this.save()}>บันทึก</Button>
                            <Button style={{background: '#FFB6C1',color: '#000066',marginLeft:40}} tag={Link} to={"/TableOrgani"}>กลับ</Button>
                        </FormGroup>
          </Container> 
           
      </div>
    }
  }
  export default OrganizeInput;
