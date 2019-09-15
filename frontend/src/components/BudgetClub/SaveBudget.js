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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class SaveBudget extends Component {
  emptyItem = {
    date: '',
    income: '',
    pay: '',
    detail: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {club: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
    console.log(item);
  }

  async save() {
    const {setItem} = this.state;
    const {club} = this.state;
    if(setItem.income != '' & setItem.pay != ''){
      alert('โปรดกรอกแค่รายรับ หรือ รายจ่ายเท่านั้น');
    }else if(setItem.income != '' & setItem.pay == '' & setItem.date != '' & setItem.detail != '') {
      await fetch(`http://localhost:8080/saveBudget/${club.clubId}/${setItem.date}/${setItem.income}/0/${setItem.detail}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then(data => console.log(data),
            alert('บันทึกสำเร็จ'),
            window.location.reload())
      .catch((error) => {
      console.log("Error"+ error);
      alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      });
    }else if(setItem.income == '' & setItem.pay != '' & setItem.date != '' & setItem.detail != ''){
      await fetch(`http://localhost:8080/saveBudget/${club.clubId}/${setItem.date}/0/${setItem.pay}/${setItem.detail}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then(data => console.log(data),
            alert('บันทึกสำเร็จ'),
            window.location.reload())
      .catch((error) => {
      console.log("Error"+ error);
      alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      });
    }else {
      alert('กรุฯากรอกข้อมูลให้ครบถ้วน');
    }
        
  }

    render() {
      const {club} = this.state;
      const {setItem} = this.state;
      
    console.log(club);

      return <div>
         <AppNavbar/>
      
          <Container>
         
          <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <FormGroup className="col-md-4 mb-3">
                  <TextField style={{ width: '250px',paddingTop: '1%'}}
                  id="date"
                  label="วันที่" 
                  type="date"
                  onChange={this.handleChange}
                  name="date"
                  InputLabelProps={{
                  shrink: true,
                 
                 }}
                /> 
                <form >
                <TextField  style={{ width: '250px',paddingTop: '2%' }}
                    label="รายรับ(บาท)"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="income"
                   
                />
                <TextField  style={{ width: '250px',paddingTop: '2%'}}
                    label="รายจ่าย(บาท)"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="pay"  
                />
                <TextField style={{ width: '250px',paddingTop: '2%'}}
                      label="รายละเอียด"
                      multiline
                      rows="5"
                      defaultValue=' '
                      value={this.state.setItem.detail}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="detail"
                  />
                  <Button style={{width: '100px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}}onClick={() => this.save()}>บันทึก</Button>
                  <Button style={{width: '110px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}} tag={Link} to={"/ShowDetail/"+this.props.match.params.clubId}>รายละเอียด</Button>
                
             </form>
            </FormGroup>
            </div>
            </Form>
          </Container> 
           
      </div>
    }
  }
  export default SaveBudget;
