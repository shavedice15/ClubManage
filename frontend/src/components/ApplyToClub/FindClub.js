import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
                <Label >ชื่อชมรม</Label>
                <Input type="text" name="club" id="club" 
                         autoComplete="club"/>
                </FormGroup>

                <FormGroup className="col-md-4 mb-3">
                  <InputLabel htmlFor="tag-helper">Tag</InputLabel>
                  <Select 
                    value={this.state.tag}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Auto width</FormHelperText>
                </FormGroup>
            </div>
            <FormGroup>
                <Button color="primary" type="submit">ค้นหา</Button>{' '}
            </FormGroup>
            </Form>
          </Container>
      </div>
    }
  }
  
  export default FindClub;