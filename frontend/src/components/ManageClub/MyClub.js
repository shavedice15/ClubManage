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
import {auth} from '../../firebase';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
}));

class MyClub extends Component {
  constructor(props) {
    super(props);
    this.state = {club: [],
                  currentUser: null,
                  memberClub: []};
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        fetch('http://localhost:8080/myClub/'+user.email)
          .then(response => response.json())
          .then(data => this.setState({club: data}))
          .catch((error) => {
            console.log("Error"+ error);
        });
      }else{
        window.location = '/login';
      }
    })
  }

  async detail(status,clubId) {
    if(status == 'รอการตอบรับ'){
      window.location = '/ClubInfo/'+clubId;
    }
    else if(status == 'เป็นสมาชิก') {
      window.location = '/manage/'+clubId;
    }
  }

  render() {
    const {club} = this.state;
    console.log(club);
    
    const clubList = club.map(club => {
        return (
          <tr>
            <td align="center">{club.club.clubName}</td>
            <td align="center">{club.position.position}</td>
            <td align="center">{club.memberStatus.status}</td>
            <td align="center">{club.club.clubStatus.status}</td>
            <td align="center">{club.club.note}</td>
            <td align="center">
              <Button style={{ background: '#000066',width: '40px' }} 
                  onClick={() => this.detail(club.memberStatus.status,club.club.clubId)}>
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
              <div style={{ paddingBottom:'20px'}}>
                  <h2 align="center">ชมรมของฉัน</h2>
              </div>
            <Table className="mt-4" >
                <thead>
                <tr align="center">
                    <th width="20%">ชื่อชมรม</th>
                    <th width="10%" >ตำแหน่ง</th>
                    <th width="10%" >สถานะสมาชิก</th>
                    <th width="20%" >สถานะชมรม</th>
                    <th width="20%" >หมายเหตุ</th>
                    <th width="10%">รายละเอียด</th>
                </tr>
                </thead>
                <tbody>
                    {clubList}
                </tbody>
            </Table>
          </form>
        </Container>
        
      </div>
    );
  }
}

export default MyClub;