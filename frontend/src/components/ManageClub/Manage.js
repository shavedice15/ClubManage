import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import {auth} from '../../firebase';
import Test from '../../Test.js';
class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {club: [],
                  adviser: [],
                  position: [],
                  activity: [],
                  currentUser:null};
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
        fetch('http://localhost:8080/findMyClub/'+this.props.match.params.clubId+'/'+user.email)
          .then(response => response.json())
          .then(data => this.setState({position: data.position}))
          .catch((error) => {
            console.log("Error"+ error);
        });
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

    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({adviser: data.adviser}))
      .catch((error) => {
        console.log("Error"+ error);
      });

    fetch('http://localhost:8080/activityByClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({activity: data}))
      .catch((error) => {
        console.log("Error"+ error);
    });
    
  }

  checkPosition() {
    const {position} = this.state;
    if(position.position == 'สมาชิก') {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    const bottonStyle = {
      background: '#000066' ,
      maxWidth: '200px',
      height:'50px',
      marginRight: '10px',
      frontSize:'5px'
    };
    var id = this.props.match.params.clubId;
    const {club} = this.state;
    const {adviser} = this.state;
    const {memberDetail} = this.state;
    const {activity} = this.state;
    console.log(club);
    console.log(memberDetail);
    const {position} = this.state;
    const activityList = activity.map(activity => {
      return (
        <tr>
          <td align="center">{activity.dateStart}</td>
          <td align="center">{activity.dateEnd}</td>
          <td align="center">{activity.activityName}</td>
          <td align="center">{activity.privacy.status}</td>
          <td align="center">
            <Button style={{ background: '#000066',width: '40px' }} 
                tag={Link} to={"/DetailActivity/"+activity.activityId}>
              ดู
            </Button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
            <div style={{float: 'left', width:'50%', paddingBottom:'50px'}} >
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <TextField
                      label="ชื่อชมรม"
                      defaultValue=" "
                      value = {club.clubName}
                      margin="normal"
                      style={{marginRight:'10px'}}
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                  />
                  <TextField
                      label="อาจารย์ที่ปรึกษาชมรม"
                      defaultValue=" "
                      value = {adviser.name}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                  />
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <TextField
                      label="Page Facebook"
                      defaultValue=" "
                      value = {club.pageFB}
                      margin="normal"
                      style={{marginRight:'10px'}}
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                  />
                  <TextField
                      label="Group Facebook"
                      defaultValue=" "
                      value = {club.groupFB}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                  />
              </div>
              
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                    <Button style={bottonStyle} tag={Link} to={"/clubMember/"+club.clubId}>รายชื่อสมาชิก</Button>
                </div>
              </div>

            <div style={{float:'left', width:'50%', paddingBottom:'50px'}}>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={bottonStyle} disabled = {this.checkPosition()}
                          tag={Link} to={"/acceptMember/"+club.clubId}>รับสมาชิก</Button>

                  <Button style={bottonStyle} disabled = {this.checkPosition()}
                          tag={Link} to={"/editClub/"+club.clubId}>แก้ไขข้อมูล</Button>
              </div>
              
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={bottonStyle} disabled = {this.checkPosition()}
                          tag={Link} to={"/ShowDetail/"+club.clubId}>งบการเงิน</Button>
                  <Button style={bottonStyle} disabled = {this.checkPosition()}
                          tag={Link} to={"/ActivityPost/"+club.clubId}>สร้างกิจกรรมใหม่</Button>
                          <Test position={position.position}  id={id}/>
              </div>
              
            </div>
          </form>

          <Table className="mt-4" >
                <thead>
                <tr align="center">
                  <th width="20%">วันที่เริ่ม</th>
                  <th width="20%">วันที่สิ้นสุด</th>
                  <th width="20%" >ชื่อกิจกรรม</th>
                  <th width="20%" >ความเป็นส่วนตัว</th>
                  <th width="10%">รายละเอียด</th>
                </tr>
                </thead>
                <tbody>
                  {activityList}
                </tbody>
            </Table>
        </Container>
        
      </div>
    );
  }
}

export default Manage;