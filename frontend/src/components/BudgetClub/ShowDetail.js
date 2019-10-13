import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Table from '@material-ui/core/Table';
import Chart from "react-apexcharts";
import Modal from '@material-ui/core/Modal';
import {auth} from '../../firebase';

class ShowDetail extends Component {

  emptyItem = {
   startDate: '',
   endDate: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {openBudgetDetail: false,
                  viewBudgetDetail: [],
                  budget: [],
                  club: [],
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
                  currentUser:null,
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseBudgetDetail = this.handleCloseBudgetDetail.bind(this);
  }
  componentDidMount() {//ดึงข้อมูล
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
      }else{
        window.location = '/login';
      }
    })

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

  handleOpenBudgetDetail(budget) {
    this.setState({openBudgetDetail: true});
    this.setState({viewBudgetDetail: budget});
  }

  handleCloseBudgetDetail(){
    this.setState({openBudgetDetail: false});
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

      const {budget,openBudgetDetail,viewBudgetDetail} = this.state;
      console.log(this.state.setItem)

    const PayList = budget.map(budget => {
        return (
          <tr>
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
      
      console.log(budget);
      var income = 0
      var pay = 0
        this.state.budget.map(x => {
          income += x.income;
          pay += x.pay
          
           
        })
      return <div>
          <AppNavbar/>
          <Container>
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div>
            <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div> <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div> <div className="row">
            <FormGroup className="col-md-5 mb-3">
              </FormGroup>
            </div>
          <Form onSubmit={this.handleSubmit}>
            <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            
            <FormGroup className="col-md-5 mb-3" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <TextField style={{margin:'2%'}}
                  id="date"
                  label="วันที่"
                  type="date"
                  onChange={this.handleChange}
                  name="startDate"
                  InputLabelProps={{
                  shrink: true,
                 }}
                />
              <TextField 
                  id="date"
                  label="ถึงวันที่"
                  type="date"
                  onChange={this.handleChange}
                  name="endDate"
                  InputLabelProps={{
                  shrink: true,
                 }}
                /><Button style={{ background: '#000066',color: '#FFFFFF',width: '15%',margin:'1%' }} onClick={() => this.find()}>ค้นหา</Button>{' '}
                  <Button style={{ background: '#000066',color: '#FFFFFF',width: '15%' }} tag={Link} to={"/SaveBudget/"+this.props.match.params.clubId}>เพิ่ม</Button>{' '}
               
              </FormGroup>
            </div>
            </Form>
            <Chart options={this.state.options} series={[income, pay]} type="pie" width="380" />
            <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#000066',color: '#FFFFFF' }} align="center">
                <th width="10%">วันที่</th>
                <th width="10%" >รายรับ</th>
                <th width="10%">รายจ่าย</th>
                <th width="20%">รายละเอียด</th>
                <th width="5%">หลักฐาน</th>
                <th width="20%">หมายเหตุ</th>
                <th width="10%"> </th>
              </tr>
              </thead>
              <tbody>
                {PayList}
              </tbody>
            </Table>
          </Container>
      </div>
    }
  }
  export default ShowDetail;
