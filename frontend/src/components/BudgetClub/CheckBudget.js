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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';

import Chart from "react-apexcharts";
class CheckBudget extends Component {
  emptyItem = {
    nameId: '',
    startDate: '',
    endDate: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {clubName: [],
                  budget: [],
                  options: {
                    labels: ['รายรับ', 'รายจ่าย'],
                    responsive: [{
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }]
                  },
                  memberclub:[],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/clubs')
      .then(response => response.json())
      .then(data => this.setState({clubName: data}));

    fetch('http://localhost:8080/Budgets')
      .then(response => response.json())
      .then(data => this.setState({budget: data}));

  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
    console.log(item);
  }

  async find() {
    const {setItem} = this.state;
    if(setItem.nameId != ''){
      fetch(`http://localhost:8080/memberClub/${setItem.nameId}`)
      .then(response => response.json())
      .then(data => this.setState({ memberclub: data }));
  
    }

    if((setItem.nameId==''|| setItem.nameId==' ') & setItem.startDate=='' & setItem.endDate==''){
      const findBudget = await (
        await fetch(`http://localhost:8080/Budgets`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
        this.setState({budget: findBudget});
    }else if ((setItem.nameId != '' || setItem.nameId != ' ') & setItem.startDate == '' & setItem.endDate == ''){
      const findBudget = await (
        await fetch(`http://localhost:8080/findBudgetsByClub/${setItem.nameId}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
        this.setState({budget: findBudget});
    }else if ((setItem.nameId=='' || setItem.nameId==' ') & setItem.startDate!='' & setItem.endDate!=''){
      const findBudget = await (
        await fetch(`http://localhost:8080/findByDate/${setItem.startDate}/${setItem.endDate}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
        this.setState({budget: findBudget});
    }else if ((setItem.nameId!='' || setItem.nameId!=' ') & setItem.startDate!='' & setItem.endDate!=''){
      const findBudget = await (
      await fetch(`http://localhost:8080/findByClubAndDate/${setItem.nameId}/${setItem.startDate}/${setItem.endDate}`)
      .catch((error) => {
        console.log("Error"+ error);
      })).json();
      this.setState({budget: findBudget});
    
    }
    
  }

    render() {
      const {clubName} = this.state;
      const {setItem} = this.state;
      const {budget} = this.state;
      const {club} = this.state;
      const nameList = clubName.map(name => {
        return (
          <MenuItem value={name.clubId}>{name.clubName}</MenuItem>
        )
      });
    console.log(clubName);

    const PayList = budget.map(budget => {
      return (
        <tr>
          <td align="center">{budget.club.clubName}</td>{/*.ดูตามชื่อตัวแปรหลังบ้าน */}
          <td align="center">{budget.date}</td>{/*.ดูตามชื่อตัวแปรหลังบ้าน */}
          <td align="center">{budget.income}</td>
          <td align="center">{budget.pay}</td>
          <td align="center">{budget.detail}</td>
          <td align="center"><a target="_blank" href={budget.url}>คลิกเพื่อดู</a></td>
          <td align="center">{budget.note}</td>
        </tr>
      )
    });

    var income = 0
    var pay = 0
    this.state.budget.map(x => {
      income += x.income;
      pay += x.pay
      
       
    })
      return <div>
      <AppNavBarOrganization/>
          <Container>
           <Form onSubmit={this.handleSubmit}>
           <div className="row" style={{width: '1000%'}}>
           <FormGroup className="col-md-4 mb-3" style={{width: '1000%',color: '#FFFFFF'}}/*align="center" */>
                  <InputLabel htmlFor="tag-helper">ชื่อชมรม</InputLabel>
                    <Select 
                      value={this.state.setItem.nameId}
                      onChange={this.handleChange}
                      style={{ width: '250px',  textAlign: 'center',margin:'1%'}}
                      input={<OutlinedInput name="nameId"/>}
                    >
                      <MenuItem value=" "><em>ทั้งหมด</em></MenuItem>
                      {nameList}
                    </Select>
                   
                  <TextField style={{margin:'1%'}}
                    id="date"
                    label="วันที่"
                    type="date"
                    onChange={this.handleChange}
                    name="startDate"
                    InputLabelProps={{
                    shrink: true,
                 }}
                />
                <TextField  style={{margin:'1%'}}
                  id="date"
                  label="ถึงวันที่"
                  type="date"
                  onChange={this.handleChange}
                  name="endDate"
                  InputLabelProps={{
                  shrink: true,
                 }}
                />  
                <Button style={{ background: '#FFB6C1',color: '#000066',width: '100px' }} onClick={() => this.find()}>ค้นหา</Button>
            </FormGroup>
            
           </div>
           <Chart options={this.state.options} series={[income, pay]} type="pie" width="380" />
           <p>สมาชิกของ ชมรม มีทั้งหมด {this.state.memberclub.length} คน</p>
           <div>
           <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#FFB6C1',color: '#000066' }} align="center">
                <th width="20%">ชมรม</th>
                <th width="20%">วันที่</th>
                <th width="20%" >รายรับ</th>
                <th width="10%">รายจ่าย</th>
                <th width="10%">รายละเอียด</th>
                <th width="10%">หลักฐาน</th>
                <th width="10%">หมายเหตุ</th>
              </tr>
              </thead>
              <tbody>
                {PayList}
              </tbody>
            </Table>
           </div>

           
            </Form>
          </Container>
      </div>
    }
  }
  export default CheckBudget;
