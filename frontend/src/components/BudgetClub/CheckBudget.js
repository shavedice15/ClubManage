import React, { Component } from 'react';
import '../../App.css';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import Chart from "react-apexcharts";
import {auth} from '../../firebase';
import Modal from '@material-ui/core/Modal';

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
                  openBudgetDetail: false,
                  viewBudgetDetail: [],
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
                  currentUser:null,
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseBudgetDetail = this.handleCloseBudgetDetail.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
      }else{
        window.location = '/loginOrganization';
      }
    })

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

  handleOpenBudgetDetail(budget) {
    this.setState({openBudgetDetail: true});
    this.setState({viewBudgetDetail: budget});
  }

  handleCloseBudgetDetail(){
    this.setState({openBudgetDetail: false});
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
        paddingTop: '10%'
      };
      const textStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      const {clubName,openBudgetDetail,viewBudgetDetail} = this.state;
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
          <td align="center">
              <Button style={{ background: '#000066',maxWidth: '300px' }} onClick={() => this.handleOpenBudgetDetail(budget)}>
                รายละเอียดทั้งหมด
              </Button>
            </td>
            <Modal
              open={openBudgetDetail}
              onClose={this.handleCloseBudgetDetail}
              style={modalStyle}
            >
              <div style={paperStyle}>
                <div className="row" style={textStyle}>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                        label="วันที่"
                        defaultValue=" "
                        value = {viewBudgetDetail.date}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="รายรับ"
                      defaultValue=" "
                      value={viewBudgetDetail.income}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-3 mb-3">
                    <TextField
                      label="รายจ่าย"
                      defaultValue=" "
                      value={viewBudgetDetail.pay}
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
                        label="รายละเอียด"
                        multiline
                        rows="7"
                        defaultValue=" "
                        value = {viewBudgetDetail.detail}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}          
                        variant="outlined"
                      />
                  </FormGroup>
                  <FormGroup className="col-md-4 mb-3">
                    <TextField
                      label="หมายเหตุ"
                      multiline
                      rows="7"
                      defaultValue=" "
                      value={viewBudgetDetail.note || " "}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}          
                      variant="outlined"
                    />
                  </FormGroup>
                </div>

                <div className="row" style={textStyle}>
                  <FormGroup>
                  <img src={viewBudgetDetail.url || 'http://via.placeholder.com/500x400'} alt="Uploaded images" height="400" width="500"/>
                  </FormGroup>
                </div>

              </div>
            </Modal>
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
                <th width="10%">วันที่</th>
                <th width="5%">รายรับ</th>
                <th width="5%">รายจ่าย</th>
                <th width="20%">รายละเอียด</th>
                <th width="5%">หลักฐาน</th>
                <th width="15%">หมายเหตุ</th>
                <th width="10%"> </th>
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
