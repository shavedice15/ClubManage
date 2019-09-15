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

class DetailActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {activity: []};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    
    fetch('http://localhost:8080/getActivity/'+this.props.match.params.activityId)
      .then(response => response.json())
      .then(data => this.setState({activity: data}))
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
    render() {
      const {activity} = this.state;
      return <div>
      <AppNavbar/>
          <Container>
           <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
           <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
           <FormGroup className="col-md-4 mb-3" style={{width: '1000px'}} >
           <InputLabel htmlFor="tag-helper">ชื่อกิจกรรม:</InputLabel>
           <TextField  style={{ width: '250px' }}
                    defaultValue=" "
                    value={activity.activityName}
                    margin="normal"     
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                />
            <InputLabel htmlFor="tag-helper">วันที่:</InputLabel>
           <TextField  style={{ width: '250px' }}
                    defaultValue=" "
                    value={activity.dateStart}
                    margin="normal"     
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                />

         <InputLabel htmlFor="tag-helper">ถึงวันที่:</InputLabel>
           <TextField  style={{ width: '250px' }}
                    defaultValue=" "
                    value={activity.dateEnd}
                    margin="normal"     
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                />

<InputLabel htmlFor="tag-helper">รายละเอียด:</InputLabel>
           <TextField  style={{ width: '250px'}}
                    defaultValue=" "
                    value={activity.detail}
                    margin="normal"   
                    multiline
                    rows="5" 
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                   
                />

                 </FormGroup>
           </div>
            
            
            
            
            </Form>

            
          </Container>
      </div>
    }
  }
  export default DetailActivity;
