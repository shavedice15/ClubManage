import React, { Component } from 'react';
import '../../App.css';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AppNavbar from '../../AppNavbar';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';

class ClubMember extends Component {
  emptyItem = {
    positionId: ''
  };

  constructor(props) {
    super(props);
    this.state = {club: [],
                  member: [],
                  position: [],
                  myPosition: [],
                  viewMemberDetail:[],
                  openMemberDetail: false,
                  openEditPosition: false,
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseMemberDetail = this.handleCloseMemberDetail.bind(this);
    this.handleCloseEditPosition = this.handleCloseEditPosition.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });

    fetch('http://localhost:8080/memberClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({member: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
    
    fetch('http://localhost:8080/position')
      .then(response => response.json())
      .then(data => this.setState({position: data}))
      .catch((error) => {
        console.log("Error"+ error);
    });

    fetch('http://localhost:8080/findMyClub/'+this.props.match.params.clubId+'/test')
      .then(response => response.json())
      .then(data => this.setState({myPosition: data.position}))
      .catch((error) => {
        console.log("Error"+ error);
    });
  }

  checkPosition() {
    const {myPosition} = this.state;
    if(myPosition.position == 'สมาชิก') {
      return true;
    }
    else {
      return false;
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
  }

  handleOpenMemberDetail(member) {
    this.setState({openMemberDetail: true});
    this.setState({viewMemberDetail: member});
  }

  handleCloseMemberDetail(){
    this.setState({openMemberDetail: false});
  }

  handleOpenEditPosition(member) {
    this.setState({openEditPosition: true});
    this.setState({viewMemberDetail: member});
  }

  handleCloseEditPosition(){
    this.setState({openEditPosition: false});
    const positionId = ''
    this.setState({setItem: positionId});
  }

  async save(memberId,positionId) {
      await fetch('http://localhost:8080/editPosition/'+this.state.club.clubId+'/'+memberId+'/'+positionId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
      .then(data => this.handleCloseEditPosition())
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })

      fetch('http://localhost:8080/memberClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({member: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
  }

  async remove(memberClubId) {
    await fetch(`http://localhost:8080/deleteMember/${memberClubId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .catch((error) => {
      console.log("Error"+ error);
      alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
    });

    fetch('http://localhost:8080/memberClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({member: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
      
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

    const {club} = this.state;
    const {member} = this.state;
    const {position} = this.state;
    const {openMemberDetail} = this.state;
    const {openEditPosition} = this.state;

    const {viewMemberDetail} = this.state;
 
    const positionList = position.map(position => {
      return (
        <MenuItem value={position.id}>{position.position}</MenuItem>
      )
    });

    const memberList = member.map(member => {
        return (
          <tr>
            <td>{member.member.name}</td>
            <td align="center">{member.position.position}</td>
            <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} 
                onClick={() => this.handleOpenMemberDetail(member.member)}>
                ดู
              </Button>
            </td>
            <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} disabled = {this.checkPosition()}
                onClick={() => this.handleOpenEditPosition(member.member)}>
                แก้ไข
              </Button>
            </td>
            <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} disabled = {this.checkPosition()}
                onClick={() => this.remove(member.id)}>
                ลบ
              </Button>
            </td>

            <Modal
              open={openMemberDetail}
              onClose={this.handleCloseMemberDetail}
              style={modalStyle}
            >
              <div style={paperStyle}>
                <div className="row" style={textStyle}>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                        label="รหัสนักศึกษา"
                        defaultValue=" "
                        value = {viewMemberDetail.studentid}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="ชื่อ"
                      defaultValue=" "
                      value={viewMemberDetail.name}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="ชื่อเล่น"
                      defaultValue=" "
                      value={viewMemberDetail.nickname}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                </div>

                <div className="row" style={textStyle}>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                        label="วันเกิด"
                        defaultValue=" "
                        value = {viewMemberDetail.birthday}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="เบอร์ติดต่อ"
                      defaultValue=" "
                      value={viewMemberDetail.tell}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="Facebook"
                      defaultValue=" "
                      value={viewMemberDetail.facebook}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                </div>

                <div className="row" style={textStyle}>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                        label="ที่อยู่"
                        defaultValue=" "
                        value = {viewMemberDetail.address}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="อำเภอ"
                      defaultValue=" "
                      value={viewMemberDetail.aumphoe}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="จังหวัด"
                      defaultValue=" "
                      value={viewMemberDetail.changwat}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                </div>

                <div className="row" style={textStyle}>
                  <FormGroup className="col-md-4 mb-3">
                    <TextField
                        label="สำนักวิชา"
                        defaultValue=" "
                        value = {viewMemberDetail.major}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-4 mb-3">
                    <TextField
                      label="สาขาวิชา"
                      defaultValue=" "
                      value={viewMemberDetail.branch}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                </div>

                <Divider />

                <div className="row" style={textStyle}>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                        label="ชื่อผู้ปกครอง"
                        defaultValue=" "
                        value = {viewMemberDetail.nameparent}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="เบอร์ติดต่อผู้ปกครอง"
                      defaultValue=" "
                      value={viewMemberDetail.tellparent}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="ที่อยู่"
                      defaultValue=" "
                      value={viewMemberDetail.address}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                </div>

              </div>
            </Modal>
            
            <Modal
              title="title" 
              open={openEditPosition}
              onClose={this.handleCloseEditPosition}
              style={modalStyle}>
                <div style={paperStyle}>
                  <div>
                    <InputLabel htmlFor="tag-helper">ตำแหน่ง</InputLabel>
                  <Select 
                    value={this.state.setItem.positionId}
                    onChange={this.handleChange}
                    style={{ width: '200px',  textAlign: 'center'}}
                    input={<OutlinedInput name="positionId"/>}
                  >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {positionList}
                  </Select>
                  </div>
                  <div>
                    <Button style={{ background: '#000066',maxWidth: '300px', marginTop:'10px'}} 
                      onClick={() => this.save(viewMemberDetail.id, this.state.setItem.positionId)}>
                        บันทึก
                    </Button>
                  </div>
                  
                </div>
            </Modal>
            
          </tr>
        )
    });
    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
              <div style={{ paddingBottom:'10px'}}>
                <h2 align="center" style={{ color:'#C0392B'}}>สมาชิกชมรม</h2>
                <h3 align="center">{club.clubName}</h3>
              </div>
          </form>
          <Table className="mt-4" >
                <thead>
                <tr align="center">
                  <th width="20%">ชื่อ</th>
                  <th width="20%" >ตำแหน่ง</th>
                  <th width="10%">ข้อมูล</th>
                  <th width="10%">เปลี่ยนตำแหน่ง</th>
                  <th width="10%">ไล่ออก</th>
                </tr>
                </thead>
                <tbody>
                  {memberList}
                </tbody>
            </Table>
        </Container>
        
      </div>
    );
  }
}

export default ClubMember;