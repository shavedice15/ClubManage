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

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
}));

class RegisClub extends Component {
  emptyItem = {
    clubId: '',
    reason: ''
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
  }

  async save() {
    const {setItem} = this.state;
    const club = await (
      await fetch('http://localhost:8080/regisToClub/1/'+setItem.clubId+'/'+setItem.reason, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })
    );
    if(club){
      window.location = '/FindClub';
      alert('สมัครเข้าชมรมสำเร็จ กรุณารอการตอบรับจากชมรมที่สมัคร');
    }
  }

  render() {
    const {club} = this.state;
    this.emptyItem.clubId = club.clubId;
    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <TextField
                    label="ชื่อชมรม"
                    defaultValue=" "
                    value = {club.clubName}
                    className={useStyles.textField}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}          
                    variant="outlined"
                />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <TextField
                    label="เหตุผลที่อยากเข้าชมรม"
                    multiline
                    rows="10"
                    defaultValue=" "
                    className={useStyles.textField}
                    margin="normal"    
                    variant="outlined"
                    style={{ width: '80%'}}
                    onChange={this.handleChange}
                    name="reason"
                />
            </div>
            <FormGroup></FormGroup>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Button style={{ background: '#000066' ,width: '10%'}} onClick={() => this.save()}>ส่ง</Button>
            </div>
          </form>
        </Container>
        
      </div>
    );
  }
}

export default RegisClub;