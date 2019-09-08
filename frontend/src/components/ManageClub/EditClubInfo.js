import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

class EditClubInfo extends Component {
  emptyItem = {
    clubName: '',
    typeId: '',
    pageFB: '',
    groupFB: '',
    invitation: '',
    adviserId: ''
  };

  constructor(props) {
    super(props);
    this.state = {club: [],
                  getTypeClub: '',
                  getAdviser: [],
                  typeClubs: [],
                  advisers: [],
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

    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.emptyItem.typeId = data.typeClub.id)
      .catch((error) => {
        console.log("Error"+ error);
    });

    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.emptyItem.adviserId = data.adviser.id)
      .catch((error) => {
        console.log("Error"+ error);
    });

    fetch('http://localhost:8080/typeClub')
      .then(response => response.json())
      .then(data => this.setState({typeClubs: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });

    fetch('http://localhost:8080/api/advisers')
      .then(response => response.json())
      .then(data => this.setState({advisers: data}))
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
  }

  async update() {
    const {setItem} = this.state;
    const club = await (
      await fetch(`http://localhost:8080/updateClub/${this.props.match.params.clubId}/
        ${this.state.setItem.clubName}/${this.state.setItem.pageFB}/${this.state.setItem.groupFB}
        /${this.state.setItem.invitation}/${this.state.setItem.typeId}/${this.state.setItem.adviserId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } })//,
        //body: JSON.stringify(setItem.clubName,setItem.groupFB),})
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })
    );
    if(club){
      window.location = '/manage/'+this.props.match.params.clubId;
      alert('บันทึกสำเร็จ');
    }
  }

  render() {
    const {club} = this.state;
    const {typeClubs} = this.state;
    const {advisers} = this.state;

    this.emptyItem.clubName = club.clubName;
    this.emptyItem.pageFB = club.pageFB;
    this.emptyItem.groupFB = club.groupFB;
    this.emptyItem.invitation = club.invitation;
    console.log(this.emptyItem);
    console.log(this.state.setItem);

    const typeList = typeClubs.map(type => {
      return (
        <MenuItem value={type.id}>{type.typeClub}</MenuItem>
      )
    });

    const adviserList = advisers.map(adviser => {
      return (
        <MenuItem value={adviser.id}>{adviser.name}</MenuItem>
      )
    });
    return (
      <div>
        <AppNavbar/>
        <Container>
        <Form onSubmit={this.handleSubmit}>
              <div className="row">
                  <FormGroup className="col-md-6 mb-3">
                  <TextField
                      label="ชื่อชมรม"
                      defaultValue=' '
                      value={this.state.setItem.clubName}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="clubName"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-6 mb-3" >
                  <InputLabel htmlFor="tag-helper">ประเภทชมรม</InputLabel>
                    <Select 
                      value={this.state.setItem.typeId}
                      onChange={this.handleChange}
                      style={{ width: '45%',  textAlign: 'center'}}
                      input={<OutlinedInput name="typeId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {typeList}
                    </Select>
                          
                  </FormGroup>
              </div>

              <div className="row">
                  <FormGroup className="col-md-6 mb-3">
                  <TextField
                      label="กลุ่ม Facebook"
                      defaultValue=' '
                      value={this.state.setItem.groupFB}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="groupFB"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-6 mb-3" >
                  <TextField
                      label="เพจ Facebook"
                      defaultValue=' '
                      value={this.state.setItem.pageFB}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="pageFB"
                    />
                          
                  </FormGroup>
              </div>

              <div className="row">
                  <FormGroup className="col-md-6 mb-3" >
                  <InputLabel htmlFor="tag-helper">อาจารย์ที่ปรึกษาชมรม</InputLabel>
                    <Select 
                      value={this.state.setItem.adviserId}
                      onChange={this.handleChange}
                      style={{ width: '45%',  textAlign: 'center'}}
                      input={<OutlinedInput name="adviserId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {adviserList}
                    </Select>
                          
                  </FormGroup>

                  <FormGroup className="col-md-6 mb-3" >
                  <TextField
                      label="คำเชิญชวน"
                      multiline
                      rows="7"
                      defaultValue=' '
                      value={this.state.setItem.invitation}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="invitation"
                    />
                          
                  </FormGroup>
              </div>

              <FormGroup>
                  <Button style={{ background: '#000066' }} onClick={() => this.update()}>บันทึก</Button>
              </FormGroup>
            </Form>
        </Container>
        
      </div>
    );
  }
}

export default EditClubInfo;