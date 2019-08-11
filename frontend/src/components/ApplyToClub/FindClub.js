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



class FindClub extends Component {
  constructor(props) {
    super(props);
    this.state = {tag: ""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({tag: event.target.value});
  }

    render() {
      return <div>
          <AppNavbar/>
          <Container>
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
                <FormGroup className="col-md-6 mb-3">
                <TextField
                    id="outlined-required"
                    label="ชื่อชมรม"
                    defaultValue=" "
                    className={useStyles.textField}
                    margin="normal"     
                    variant="outlined"
                  />
                </FormGroup>

                <FormGroup className="col-md-4 mb-3" >
                <InputLabel htmlFor="tag-helper">Tag</InputLabel>
                  <Select 
                    value={this.state.tag}
                    onChange={this.handleChange}
                    style={{ width: '45%',  textAlign: 'center'}}
                    input={<OutlinedInput name="tag" id="outlined-tag-simple" />}
                  >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>ดนตรี</MenuItem>
                    <MenuItem value={20}>กีฬา</MenuItem>
                    <MenuItem value={30}>ศาสนา</MenuItem>
                  </Select>
                </FormGroup>
            </div>
            <FormGroup>
                <Button style={{ background: '#000066' }} type="submit">ค้นหา</Button>
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
              <tr>
                <td>ดนตรีสากล</td>
                <td align="center">ดนตรี</td>
                <td align="center"><Button style={{ background: '#000066',width: '45%' }} tag={Link} to={"/ClubInfo"}>ดู</Button></td>
              </tr>
              <tr>
                <td>สมาธิ</td>
                <td align="center">ศาสนา</td>
                <td align="center"><Button style={{ background: '#000066' ,width: '45%' }} tag={Link} to={"/ClubInfo"}>ดู</Button></td>
              </tr>
            </tbody>
          </Table>
          </Container>
      </div>
    }
  }
  
  export default FindClub;