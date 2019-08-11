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

class ClubInfo extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
            <div className="row">
              <FormGroup className="col-md-5 mb-3">
                <TextField
                    id="outlined-required"
                    label="ชื่อชมรม"
                    defaultValue="ดนตรีสากล"
                    className={useStyles.textField}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}          
                    variant="outlined"
                  />
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <TextField
                  id="outlined-required"
                  label="ประเภทชมรม"
                  defaultValue="ดนตรี"
                  className={useStyles.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}          
                  variant="outlined"
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-5 mb-3">
                <TextField
                  id="outlined-required"
                  label="แนะนำชมรม"
                  multiline
                  rows="7"
                  defaultValue="Hello World"
                  className={useStyles.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}          
                  variant="outlined"
                  style={{ width: '80%'}}
                />
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <TextField
                  id="outlined-required"
                  label="เพจ"
                  defaultValue="Musiccc"
                  className={useStyles.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}          
                  variant="outlined"
                />
                <FormGroup></FormGroup>
                <FormGroup>
                  <Button style={{ background: '#000066' }} type="submit" tag={Link} to={"/RegisClub"}>สมัคร</Button>
                </FormGroup>
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <TextField
                  id="outlined-required"
                  label="กลุ่ม"
                  defaultValue="MusicccGroup"
                  className={useStyles.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}          
                  variant="outlined"
                />
              </FormGroup>
            </div>
            <Table className="mt-4" >
                <thead>
                <tr align="center">
                  <th width="20%">วันที่เริ่ม</th>
                  <th width="20%" >ชื่อกิจกรรม</th>
                  <th width="10%">รายละเอียด</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">2/02/2562</td>
                    <td align="center">ประกวดดนตรีสากล</td>
                    <td align="center"><Button style={{ background: '#000066',width: '45%' }} tag={Link} to={"/ClubInfo"} block>ดู</Button></td>
                  </tr>
                  <tr>
                    <td align="center">1/02/2562</td>
                    <td align="center">เข้าค่ายดนตรี</td>
                    <td align="center"><Button style={{ background: '#000066' ,width: '45%' }} tag={Link} to={"/ClubInfo"}>ดู</Button></td>
                  </tr>
                </tbody>
            </Table>
          </form>
        </Container>
        
      </div>
    );
  }
}

export default ClubInfo;