import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Button, Container, FormGroup, Table } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import {auth} from '../../firebase';

class ClubMember extends Component {

  constructor(props) {
    super(props);
    this.state = {club: [],
                  member: [],
                  viewMemberDetail:[],
                  openMemberDetail: false,
                  currentUser:null};
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseMemberDetail = this.handleCloseMemberDetail.bind(this);
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

    fetch('http://localhost:8080/acceptMemberClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({member: data}))
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

  handleOpenMemberDetail(member) {
    this.setState({openMemberDetail: true});
    this.setState({viewMemberDetail: member});
  }

  handleCloseMemberDetail(){
    this.setState({openMemberDetail: false});
  }

  async save(memberClubId) {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
        window.location = '/ProfileMember';
      }
    })

    await fetch(`http://localhost:8080/acceptMember/${memberClubId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((error) => {
      console.log("Error"+ error);
      alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
    });

    fetch('http://localhost:8080/acceptMemberClub/'+this.props.match.params.clubId)
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
    }).catch((error) => {
      console.log("Error"+ error);
      alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
    });

    fetch('http://localhost:8080/acceptMemberClub/'+this.props.match.params.clubId)
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
    const {openMemberDetail} = this.state;

    const {viewMemberDetail} = this.state;

    const memberList = member.map(member => {
        return (
          <tr>
            <td>{member.member.name}</td>
            <td align="center">{member.reason}</td>
            <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} onClick={() => this.handleOpenMemberDetail(member.member)}>
                ดู
              </Button>
            </td>
            <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} onClick={() => this.save(member.id)}>
                ตกลง
              </Button>
            </td>
            <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} onClick={() => this.remove(member.id)}>
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
          </tr>
        )
    });
      console.log(member);
    return (
      <div>
        <AppNavbar/>
        <Container>
            <form>
              <div style={{ paddingBottom:'10px'}}>
                  <h2 align="center" style={{ color:'#C0392B'}}>รับสมาชิกชมรม</h2>
                  <h3 align="center">{club.clubName}</h3>
              </div>
            </form>
            <Table className="mt-4" >
                <thead>
                <tr align="center">
                  <th width="20%">ชื่อ</th>
                  <th width="20%" >เหตุผล</th>
                  <th width="20%" >ช้อมูล</th>
                  <th width="10%">รับ</th>
                  <th width="10%">ลบ</th>
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