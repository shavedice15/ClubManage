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


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

class ShowDetail extends Component {

  emptyItem = {
   startDate: '',
   endDate: ''
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
    const findBudget = await (
      await fetch(`http://localhost:8080/findByClubAndDate/${this.props.match.params.clubId}/${setItem.startDate}/${setItem.endDate}`)
      .catch((error) => {
        console.log("Error"+ error);
      })).json();
    this.setState({budget: findBudget});
  }
  
    render() {
      const {budget} = this.state;
      const {club} = this.state;
    
    const PayList = budget.map(budget => {
        return (
          <tr>
            <td align="center">{budget.date}</td>{/*.ดูตามชื่อตัวแปรหลังบ้าน */}
            <td align="center">{budget.income}</td>
            <td align="center">{budget.pay}</td>
            <td align="center">{budget.detail}</td>
          </tr>
        )
      });
      {/*<td align="center">{club.typeClubเอนติตี้.typeClubข้างใน}</td> */}
      console.log(budget);

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
            <div className="row">
            
            <FormGroup className="col-md-5 mb-3">
              <TextField 
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
                />
                <Button style={{ background: '#000066',color: '#FFFFFF',width: '15%' }} onClick={() => this.find()}>ค้นหา</Button>{' '}
              </FormGroup>
            </div>
            </Form>
            <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#000066',color: '#FFFFFF' }} align="center">
                <th width="20%">วันที่</th>
                <th width="20%" >รายรับ</th>
                <th width="10%">รายจ่าย</th>
                <th width="10%">รายละเอียด</th>
                <th width="10%">หลักฐาน</th>
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
