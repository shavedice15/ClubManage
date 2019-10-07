import React, { Component } from 'react';
import '../../App.css';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Table from '@material-ui/core/Table';
import {auth} from '../../firebase';
class TableOrgani extends Component {
  constructor(props) {
    super(props);
    this.state = {organize: [],
                  currentUser: null};
    this.handleChange = this.handleChange.bind(this);
    
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

    fetch('http://localhost:8080/organizes')
      .then(response => response.json())
      .then(data => this.setState({organize: data}));

  }
  handleChange(event) {//เวลาพิมพ์ข้อมูลให้ข้อมูลมันเข้าไปอยู่ในตัวแปร
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
    console.log(item);
  }
  
    render() {
      const {organize} = this.state;
      
    const OrganizeList = organize.map(organize => {
        return (
          <tr>
            <td align="center">{organize.name}</td>{/*.ดูตามชื่อตัวแปรหลังบ้าน */}
            <td align="center">{organize.tell}</td>
            <td align="center">{organize.grade}</td>
            <td align="center">{organize.position.position}</td>
          </tr>
        )
      });

      console.log(organize);

      return <div>
          <AppNavBarOrganization/>
          <Container>
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div>
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div> 
          <Form onSubmit={this.handleSubmit}>
            
            </Form>
            <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#FFB6C1',color: '#000066' }} align="center">
                <th width="20%">ชื่อ-สกุล</th>
                <th width="20%" >เบอร์</th>
                <th width="10%">เกรด</th>
                <th width="10%">ตำแหน่ง</th>
               
              </tr>
              </thead>
              <tbody>
                {OrganizeList}
              </tbody>
            </Table>
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div>
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div>  
            <FormGroup style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Button style={{marginLeft:40,background: '#FFB6C1',color: '#000066'}} tag={Link} to={"/OrganizeInput"}>เพิ่ม</Button>
                            
                        </FormGroup>
          </Container>
      </div>
    }
  }
  export default TableOrgani;
