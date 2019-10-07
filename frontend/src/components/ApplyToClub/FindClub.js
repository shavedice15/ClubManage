import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Table } from 'reactstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));


class FindClub extends Component {
  emptyItem = {
    nameClub: '',
    typeId: ''
  };

  constructor(props) {
    super(props);
    this.state = {typeClub: [],
                  club: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/typeClub')
      .then(response => response.json())
      .then(data => this.setState({typeClub: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });

    fetch('http://localhost:8080/clubConfirm')
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

  async find() {
    const {setItem} = this.state;
    if (setItem.nameClub !== '' & setItem.typeId == '') { //ดึงข้อมูล
      const findClub = await (
        await fetch(`http://localhost:8080/findClubByName/${setItem.nameClub}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
      this.setState({club: findClub});
    }
    else if (setItem.nameClub == '' & setItem.typeId !== '') {
      const findClub = await (
        await fetch(`http://localhost:8080/findClubByType/${setItem.typeId}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
      this.setState({club: findClub});
    }
    else if (setItem.nameClub !== '' & setItem.typeId !== '') {
      const findClub = await (
        await fetch(`http://localhost:8080/findClubByNameAndType/${setItem.nameClub}/${setItem.typeId}`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
      this.setState({club: findClub});
    }
    else if (setItem.nameClub == '' & setItem.typeId == '') {
      const findClub = await (
        await fetch(`http://localhost:8080/clubConfirm`)
        .catch((error) => {
          console.log("Error"+ error);
        })).json();
      this.setState({club: findClub});
    }
  }
  
    render() {
      const {typeClub} = this.state;
      const {club} = this.state;
      const typeList = typeClub.map(type => {
        return (
          <MenuItem value={type.id}>{type.typeClub}</MenuItem>
        )
      });
      const clubList = club.map(club => {
        return (
          <tr>
            <td>{club.clubName}</td>
            <td align="center">{club.typeClub.typeClub}</td>
            <td align="center">
              <Button style={{ background: '#000066',width: '45%' }} tag={Link} to={"/ClubInfo/"+club.clubId}>
                ดู
              </Button>
            </td>
          </tr>
        )
      });
      console.log(club);

      return <div>
          <AppNavbar/>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <div className="row">
                  <FormGroup className="col-md-6 mb-3">
                  <TextField
                      label="ชื่อชมรม"
                      className={useStyles.textField}
                      margin="normal"     
                      variant="outlined"
                      onChange={this.handleChange}
                      name="nameClub"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4 mb-3" >
                  <InputLabel htmlFor="tag-helper">ประเภทชมรม</InputLabel>
                    <Select 
                      value={this.state.setItem.typeId}
                      onChange={this.handleChange}
                      style={{ width: '45%',  textAlign: 'center'}}
                      input={<OutlinedInput name="typeId"/>}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {typeList}
                    </Select>
                          
                  </FormGroup>
              </div>
              <FormGroup>
                  <Button style={{ background: '#000066' }} onClick={() => this.find()}>ค้นหา</Button>
              </FormGroup>
            </Form>

            <Table className="mt-4" >
              <thead>
              <tr align="center">
                <th width="20%">ชื่อชมรม</th>
                <th width="20%" >ประเภท</th>
                <th width="10%">รายละเอียด</th>
              </tr>
              </thead>
              <tbody>
                {clubList}
              </tbody>
            </Table>
          </Container>
      </div>
    }
  }
  
  export default withRouter(FindClub);