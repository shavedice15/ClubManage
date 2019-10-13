import React, { Component } from 'react';
import '../../App.css';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import {auth} from '../../firebase';

class SaveNews extends Component {
  emptyItem = {
    title: '',
    detail: '',
    date: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {currentUser:null,
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

    if(setItem.date != '' & setItem.detail != '' & setItem.title != ''){
      await fetch(`http://localhost:8080/addNews/${setItem.title}/${setItem.detail}/${setItem.date}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then(response => response.json()
      ).then(data => {
              console.log(data)
              alert('บันทึกสำเร็จ')
              window.location.reload()
      }).catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      });
    }else {
      alert('กรุณากรอกข้อมูลให้ครบ');
    }
    
  }

  render() {
    const {setItem} = this.state;
    console.log(setItem);
    return <div>
        <AppNavBarOrganization/>
    
        <Container>
        
          <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <FormGroup className="col-md-4 mb-3">
                <TextField  style={{ width: '250px',paddingTop: '2%' }}
                    label="หัวข้อ"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="title"
                    value={this.state.setItem.title}
                />
                  <TextField style={{ width: '250px',paddingTop: '1%'}}
                  id="date"
                  label="วันที่" 
                  type="date"
                  onChange={this.handleChange}
                  name="date"
                  value={this.state.setItem.date}
                  InputLabelProps={{
                  shrink: true,
                  }}
                /> 

                <form >
                <TextField style={{ width: '250px',paddingTop: '2%'}}
                      label="รายละเอียด"
                      multiline
                      rows="5"
                      defaultValue=' '
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="detail"
                      value={this.state.setItem.detail}
                  />
                  <div style={{ width: '250px',paddingTop: '5%',paddingBottom: '5%'}}>
                  </div>
                  <Button style={{marginLeft:'55%',width: '100px',background: '#FFB6C1',color: '#000066',justifyContent:'center',alignItems:'center'}} onClick={() => this.save()}>บันทึก</Button>
              </form>

            </FormGroup>
            </div>
          </Form>
        </Container> 
    </div>
    
  }
}
export default SaveNews;
