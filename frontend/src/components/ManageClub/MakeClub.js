import React, { Component } from 'react';
import '../../App.css';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Table from '@material-ui/core/Table';
import {auth} from '../../firebase';

class MakeClub extends Component {
  emptyItem = {
    statusId: '',
    note:''
  };

  constructor(props) {
    super(props);
    this.state = {club: [],
                  status: [],
                  clubId:'',
                  openEditStatus: false,
                  currentUser: null,
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseEditStatus = this.handleCloseEditStatus.bind(this);
  }

  componentDidMount() {//ดึงข้อมูล
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
      }else{
          window.location = '/loginOrganization';
      }
    }) 

    fetch('http://localhost:8080/clubNoConfirm')
      .then(response => response.json())
      .then(data => this.setState({club: data}));

    fetch('http://localhost:8080/clubStatus')
      .then(response => response.json())
      .then(data => this.setState({status: data}));
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
  }

  handleOpenEditStatus(clubId) {
    this.setState({openEditStatus: true});
    this.setState({clubId: clubId});
  }

  handleCloseEditStatus(){
    this.setState({openEditStatus: false});
    this.state.setItem.statusId = ''
    this.state.setItem.note = ''
  }

  async save(clubId) {
    await fetch(`http://localhost:8080/acceptClub/${clubId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((error) => {
      console.log("Error"+ error);
    });

    fetch('http://localhost:8080/clubNoConfirm')
      .then(response => response.json())
      .then(data => this.setState({club: data}));
  }

  async remove(clubId) {
    await fetch(`http://localhost:8080/deleteClub/${clubId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((error) => {
      console.log("Error"+ error);
    });

    fetch('http://localhost:8080/clubNoConfirm')
      .then(response => response.json())
      .then(data => this.setState({club: data}));
  }

  async set(clubId) {
    const {setItem} = this.state;
    if(setItem.statusId != '' & setItem.note != ''){
      await fetch(`http://localhost:8080/setStatus/${clubId}/${setItem.statusId}/${setItem.note}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
      }).then(response => response.json()
      ).then(data => {
        this.setState({openEditStatus: false})
        this.state.setItem.statusId = ''
        this.state.setItem.note = ''
      }).catch((error) => {
        console.log("Error"+ error);
      });
    }else if(setItem.statusId != '' & setItem.note == ''){
      await fetch(`http://localhost:8080/setStatusOnly/${clubId}/${setItem.statusId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
      }).then(response => response.json()
      ).then(data => {
        this.setState({openEditStatus: false})
        this.state.setItem.statusId = ''
        this.state.setItem.note = ''
      }).catch((error) => {
        console.log("Error"+ error);
      });
    }else if(setItem.statusId == '' & setItem.note != ''){
      await fetch(`http://localhost:8080/setNotClub/${clubId}/${setItem.note}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
      }).then(response => response.json()
      ).then(data => {
        this.setState({openEditStatus: false})
        this.state.setItem.statusId = ''
        this.state.setItem.note = ''
      }).catch((error) => {
        console.log("Error"+ error);
      });
    }

    fetch('http://localhost:8080/clubNoConfirm')
      .then(response => response.json())
      .then(data => this.setState({club: data}));
  }
  
    render() {
      const paperStyle = {
        position: 'absolute',
        maxWidth: '70%',
        maxHeight: '80%',
        background: '#FFFFFF',
        border: '2px solid #000',
        padding: '10px',
        overflow:'scroll',
      };
      const modalStyle = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
      const textStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      const {club,openEditStatus,clubId,status} = this.state;
      console.log(this.state.setItem)
      
      const statusList = status.map(status => {
        return (
          <MenuItem value={status.id}>{status.status}</MenuItem>
        )
      });

      const ClubList = club.map(club => {
        return (
          <tr>
            <td align="center">{club.clubName}</td>
            <td align="center">{club.clubStatus.status}</td>
            <td align="center">{club.note}</td>
            <td align="center">
              <Button style={{ background: '#FFB6C1', color:'#000066',maxWidth: '300px' }}
                onClick={() => this.handleOpenEditStatus(club.clubId)}>
                แก้ไข
              </Button>
            </td>
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }} 
                  onClick={() => this.save(club.clubId)}>ตกลง</Button></td>
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }} 
                  onClick={() => this.remove(club.clubId)}>ลบ</Button></td>
            
            <Modal
              title="title" 
              open={openEditStatus}
              onClose={this.handleCloseEditStatus}
              style={modalStyle}>
                <div style={paperStyle}>

                  <div>
                    <InputLabel htmlFor="tag-helper">สถานะ</InputLabel>
                  <Select 
                    value={this.state.setItem.statusId}
                    onChange={this.handleChange}
                    style={{ width: '200px',  textAlign: 'center'}}
                    input={<OutlinedInput name="statusId"/>}
                  >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {statusList}
                  </Select>
                  </div>
                  <div>
                    <FormGroup>
                      <TextField
                          label="หมายเหตุ"
                          defaultValue=" "
                          value = {this.state.setItem.note}
                          margin="normal"        
                          variant="outlined"
                          onChange={this.handleChange}
                          name="note"
                        />
                    </FormGroup>
                  </div>
                  <div>
                    <Button style={{ background: '#FFB6C1', color:'#000066',maxWidth: '300px', marginTop:'10px'}} 
                      onClick={() => this.set(clubId)}>
                        บันทึก
                    </Button>
                  </div>
                  
                </div>
            </Modal>

          </tr>
        )
      });

      return <div>
          <AppNavBarOrganization/>
          <Container>
           
          <Form onSubmit={this.handleSubmit}>
            <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            </div>
            </Form>
            <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#FFB6C1',color: '#000066' }} align="center">
                <th width="20%">ชื่อชมรม</th>
                <th width="20%">สถานะ</th>
                <th width="20%">หมายเหตุ</th>
                <th width="5%">แก้ไขสถานะ</th>
                <th width="5%">ตกลง</th>
                <th width="5%">ลบ</th>
                
              </tr>
              </thead>
              <tbody>
                {ClubList}
              </tbody>
            </Table>
          </Container>
      </div>
    }
  }
  export default MakeClub;
