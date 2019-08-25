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
    pageFB: '',
    groupFB: '',
    invitation: '',
  };

  constructor(props) {
    super(props);
    this.state = {club: [],
                  typeClub: [],
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

    fetch('http://localhost:8080/typeClub')
      .then(response => response.json())
      .then(data => this.setState({typeClub: data}))
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
      await fetch('http://localhost:8080/updateClub/1/'+this.props.match.params.clubId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(setItem),})
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })
    );
  }

  render() {
    const {club} = this.state;
    const {typeClub} = this.state;
    const typeList = typeClub.map(type => {
      return (
        <MenuItem value={type.id}>{type.typeClub}</MenuItem>
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
                      defaultValue={club.clubName}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="clubName"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4 mb-3" >
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
              <FormGroup>
                  <Button style={{ background: '#000066' }} onClick={() => this.find()}>บันทึก</Button>
              </FormGroup>
            </Form>
        </Container>
        
      </div>
    );
  }
}

export default EditClubInfo;