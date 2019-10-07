import React, { Component } from 'react';
import '../../App.css';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Button, Container, Form } from 'reactstrap';
import 'date-fns';
import Table from '@material-ui/core/Table';
import {auth} from '../../firebase';
class MakeClub extends Component {
  constructor(props) {
    super(props);
    this.state = {club: [],
                  currentUser: null};
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
  
    render() {
      const {club} = this.state;
      console.log(this.state.setItem)
      
    const ClubList = club.map(club => {
        return (
          <tr>
            <td align="center">{club.name}</td>
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }} 
                  onClick={() => this.save(club.clubId)}>ตกลง</Button></td>
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }} 
                  onClick={() => this.remove(club.clubId)}>ลบ</Button></td>
            
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
                <th width="10%">ตกลง</th>
                <th width="10%">ลบ</th>
                
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
