import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

class ClubInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {club: [],
                  activity: [],
                  isDisabled: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
    });
    
    fetch('http://localhost:8080/findMyClub/'+this.props.match.params.clubId+'/test')
      .then(response => response.json())
      .then(data => this.setState({isDisabled: true}))
      .catch((error) => {
        console.log("Error"+ error);
    });

    fetch('http://localhost:8080/activityAllUser/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({activity: data}))
      .catch((error) => {
        console.log("Error"+ error);
    });
  }

  render() {
    const {club} = this.state;
    const {activity} = this.state;
    console.log(club);

    const activityList = activity.map(activity => {
      return (
        <tr>
          <td align="center">{activity.dateStart}</td>
          <td align="center">{activity.dateEnd}</td>
          <td align="center">{activity.activityName}</td>
          <td align="center">
            <Button style={{ background: '#000066',width: '40px' }} 
                tag={Link} to={"/DetailActivity/"+activity.activityId}>
              ดู
            </Button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <AppNavbar/>
        <Container>
          <form>
            <div className="row">
              <FormGroup className="col-md-5 mb-3">
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
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <TextField
                  label="ประเภทชมรม"
                  defaultValue=" "
                  value={club.clubName}
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
                  label="แนะนำชมรม"
                  multiline
                  rows="7"
                  defaultValue=" "
                  value={club.invitation}
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
                  label="เพจ"
                  defaultValue=" "
                  value={club.pageFB}
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
                  label="กลุ่ม"
                  defaultValue=" "
                  value={club.groupFB}
                  className={useStyles.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}          
                  variant="outlined"
                />
                <FormGroup></FormGroup>
                <FormGroup>
                  <Button style={{ background: '#000066' }} type="submit" disabled = {this.state.isDisabled} 
                        tag={Link} to={"/RegisClub/" + club.clubId}>สมัคร</Button>
                </FormGroup>
              </FormGroup>
            </div>
            <Table className="mt-4" >
                <thead>
                <tr align="center">
                <th width="20%">วันที่เริ่ม</th>
                  <th width="20%">วันที่สิ้นสุด</th>
                  <th width="20%" >ชื่อกิจกรรม</th>
                  <th width="10%">รายละเอียด</th>
                </tr>
                </thead>
                <tbody>
                  {activityList}
                </tbody>
            </Table>
          </form>
        </Container>
        
      </div>
    );
  }
}

export default withRouter(ClubInfo);