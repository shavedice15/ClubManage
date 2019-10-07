import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {auth} from '../../firebase';

class ActivityPost extends Component {
  emptyItem = {
    name: '',
    startDate: '',
    endDate: '',
    privacyId: '',
    detail: '',
  };
  
  constructor(props) {
    super(props);
    this.state = {club: [],
                  privacy: [],
                  activity: [],
                  currentUser:null,
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
        window.location = '/login';
      }
    })

    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });

    fetch('http://localhost:8080/Privacys')
      .then(response => response.json())
      .then(data => this.setState({privacy: data}))
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

  async save() {
    const {setItem} = this.state;

    await fetch(`http://localhost:8080/activityPost/${this.props.match.params.clubId}/${setItem.name}/${setItem.startDate}/${setItem.endDate}/${setItem.privacyId}/${setItem.detail}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then(data => this.setState({activity:data}))
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
    });

    if(this.state.activity != ''){
      alert('บันทึกสำเร็จ');
      window.location = '/manage/'+this.props.match.params.clubId;
    }
  }

    render() {
      const {club} = this.state;
      const {privacy} = this.state;
      const {setItem} = this.state;
      const privacyList = privacy.map(status => {
        return (
          <MenuItem value={status.privacyId}>{status.status}</MenuItem>
        )
      });
    console.log(setItem);

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
                    name="name"
                /> 
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
                 <TextField style={{ width: '250px',paddingTop: '1%'}}
                  id="date"
                  label="ถึงวันที่" 
                  type="date"
                  onChange={this.handleChange}
                  name="endDate"
                  InputLabelProps={{
                  shrink: true,
                 
                 }}
                /> 
  
                <InputLabel htmlFor="tag-helper" style={{paddingTop: '2%'}}>ความเป็นส่วนตัว</InputLabel>
                    <Select 
                      value={this.state.setItem.privacyId}
                      onChange={this.handleChange}
                      style={{ width: '250px' }}
                      input={<OutlinedInput name="privacyId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {privacyList}
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
                  <Button style={{marginLeft:'85px',width: '100px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}} onClick={() => this.save()}>โพสต์</Button>
                  
                
       
            </FormGroup>
            </div>
            </Form>
          </Container> 
           
      </div>
    }
  }
  export default ActivityPost;
