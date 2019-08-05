import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class FindClub extends Component {
    render() {
      return <div>
          <AppNavbar/>
          <Container>
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
                <FormGroup className="col-md-6 mb-3">
                <Label for="stateOrProvince">ชื่อชมรม</Label>
                <Input type="text" name="stateOrProvince" id="stateOrProvince" value=' '
                        onChange={this.handleChange} autoComplete="address-level1"/>
                </FormGroup>
                <FormGroup className="col-md-4 mb-3">
                <Label for="country">Tag</Label>
                <Input type="text" name="country" id="country" value=' '
                        onChange={this.handleChange} autoComplete="address-level1"/>
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