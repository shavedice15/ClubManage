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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
}));

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {club: []};
  }

  componentDidMount() {
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
  }

  render() {
    const {club} = this.state;
    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
            <div style={{float: 'left', width:'45%', paddingBottom:'50px'}} >
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <TextField
                      label="ชื่อชมรม"
                      defaultValue=" "
                      value = {club.clubName}
                      className={useStyles.textField}
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
                      className={useStyles.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                  />
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <TextField
                      label="Group Facebook"
                      defaultValue=" "
                      value = {club.groupFB}
                      className={useStyles.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                  />
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={{ background: '#000066' ,width: '200px', height:'50px'}} onClick={() => this.save()}>สร้างกิจกรรมใหม่</Button>
              </div>
            </div>
            <div style={{float:'left', width:'45%', paddingBottom:'50px'}}>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={{ background: '#000066' ,width: '200px', height:'50px'}} onClick={() => this.save()}>รับสมาชิก</Button>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={{ background: '#000066' ,width: '200px', height:'50px'}} onClick={() => this.save()}>แก้ไขข้อมูล</Button>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={{ background: '#000066' ,width: '200px', height:'50px'}} onClick={() => this.save()}>รายชื่อสมาชิก</Button>
              </div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'30px'}}>
                  <Button style={{ background: '#000066' ,width: '200px', height:'50px'}} onClick={() => this.save()}>งบการเงิน</Button>
              </div>
            </div>
          </form>

          <Table className="mt-4" >
                <thead>
                <tr align="center">
                  <th width="20%">วันที่เริ่ม</th>
                  <th width="20%" >ชื่อกิจกรรม</th>
                  <th width="10%">รายละเอียด</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">2/02/2562</td>
                    <td align="center">ประกวดดนตรีสากล</td>
                    <td align="center"><Button style={{ background: '#000066',width: '45%' }} tag={Link} to={"/ClubInfo"} block>ดู</Button></td>
                  </tr>
                  <tr>
                    <td align="center">1/02/2562</td>
                    <td align="center">เข้าค่ายดนตรี</td>
                    <td align="center"><Button style={{ background: '#000066' ,width: '45%' }} tag={Link} to={"/ClubInfo"}>ดู</Button></td>
                  </tr>
                </tbody>
            </Table>
        </Container>
        
      </div>
    );
  }
}

export default Manage;