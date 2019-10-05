import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class MakeClub extends Component {

  emptyItem = {
   
  };
  
  constructor(props) {
    super(props);
    this.state = {budget: [],
                  club: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }
  componentDidMount() {//ดึงข้อมูล
    fetch('http://localhost:8080/findBudgetsByClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({budget: data}));

  }
  handleChange(event) {//เวลาพิมพ์ข้อมูลให้ข้อมูลมันเข้าไปอยู่ในตัวแปร
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
    console.log(item);
  }

  async find() {
    const {setItem} = this.state;
    if(setItem.startDate == '' & setItem.endDate == ''){
      const findBudget = await (
        await fetch(`http://localhost:8080/findBudgetsByClub/${this.props.match.params.clubId}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
      this.setState({budget: findBudget});
    }else if(setItem.startDate != '' & setItem.endDate != ''){
      const findBudget = await (
        await fetch(`http://localhost:8080/findByClubAndDate/${this.props.match.params.clubId}/${setItem.startDate}/${setItem.endDate}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
      this.setState({budget: findBudget});
    }else{
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
    
  }
  
    render() {
      const {budget} = this.state;
      const {club} = this.state;
      console.log(this.state.setItem)
    const PayList = budget.map(budget => {
        return (
          <tr>
            <td align="center">{budget.date}</td>{/*.ดูตามชื่อตัวแปรหลังบ้าน */}
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }}>ข้อมูล</Button></td>
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }}>ตกลง</Button></td>
            <td align="center"><Button style={{ background: '#FFB6C1', color:'#000066' }}>ลบ</Button></td>
            
          </tr>
        )
      });
      {/*<td align="center">{club.typeClubเอนติตี้.typeClubข้างใน}</td> */}
      console.log(budget);

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
                <th width="20%" >ข้อมูล</th>
                <th width="10%">ตกลง</th>
                <th width="10%">ลบ</th>
                
              </tr>
              </thead>
              <tbody>
                
              </tbody>
            </Table>
          </Container>
      </div>
    }
  }
  export default MakeClub;