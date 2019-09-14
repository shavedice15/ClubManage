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

class CheckBudget extends Component {
  emptyItem = {
    nameId: '',
    startDate: '',
    endDate: ''
  };
  
  constructor(props) {
    super(props);
    this.state = {clubName: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/clubs')
      .then(response => response.json())
      .then(data => this.setState({clubName: data}));

      fetch('http://localhost:8080/findBudgetsByClub/'+this.props.match.params.clubId)
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
                      <MenuItem value=""><em>None</em></MenuItem>
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
                <Button style={{ background: '#FFB6C1',color: '#000066',width: '100px' }} tag={Link} to={"/ShowDetail/"+setItem.nameId}>ค้นหา</Button>
            </FormGroup>
            
           </div>
           <div>
           <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#FFB6C1',color: '#000066' }} align="center">
                <th width="20%">วันที่</th>
                <th width="20%" >รายรับ</th>
                <th width="10%">รายจ่าย</th>
                <th width="10%">รายละเอียด</th>
                <th width="10%">หลักฐาน</th>
              </tr>
              </thead>
              <tbody>
              {/**   {PayList}*/}
              </tbody>
            </Table>
           </div>

           
            </Form>
          </Container>
      </div>
    }
  }
  export default CheckBudget;
