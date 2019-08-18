import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
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
   date: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {pay: [],
                  club: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }
  componentDidMount() {//ดึงข้อมูล
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}));

    fetch('http://localhost:8080/Pays/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({pay: data}));

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
    //ดึงข้อมูล
    const findPays = await (
      await fetch(`http://localhost:8080/Budgets/${setItem.clubId}/${setItem.date}`)).json();//สร้างตัวแปรที่เก็บวันที่  ส่งคลับไอดีวันที่เริ่ม วันที่สิ้นสุดไปค้นหา
      this.setState({pay: findPays});
  }
  
    render() {
      const {pay} = this.state;
      const {club} = this.state;
    
   

    /*const PayList = pay.map(pay => {
        return (
          <tr>
            <td>{pay.clubNameดูตามชื่อตัวแปรหลังบ้าน}</td>
            <td align="center">{club.typeClubเอนติตี้.typeClubข้างใน}</td>
            <td align="center">
              
            </td>
          </tr>
        )
      });
      console.log(club);*/

      return <div>
          <AppNavbar/>
          <Container>
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
            
            <FormGroup className="col-md-5 mb-3">
              <TextField
                  id="date"
                  label="วันที่"
                  type="date"
                  InputLabelProps={{
                  shrink: true,
                 }}
                />
              <TextField
                  id="date"
                  label="ถึงวันที่"
                  type="date"
                  InputLabelProps={{
                  shrink: true,
                 }}
                />
                <Button style={{ background: '#000066',width: '15%' }} onClick={() => this.find()}>ค้นหา</Button>{' '}
              </FormGroup>
            </div>
            </Form>
            <Table className="mt-4" >
              <thead>
              <tr align="center">
                <th width="20%">วันที่</th>
                <th width="20%" >รายรับ</th>
                <th width="10%">รายจ่าย</th>
                <th width="10%">ใบเสร็จ</th>
              </tr>
              </thead>
              <tbody>
                {/*{PayList}*/}
              </tbody>
            </Table>
          </Container>
      </div>
    }
  }
  export default ShowDetail;
