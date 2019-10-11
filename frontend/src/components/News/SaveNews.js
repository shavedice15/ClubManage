import React, { Component } from 'react';
import '../../App.css';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import {storage} from '../../firebase';
import {auth} from '../../firebase';

class SaveNews extends Component {
  emptyItem = {
  
  };
  


  render() {
    
    
    return <div>
        <AppNavBarOrganization/>
    
        <Container>
        
        <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <FormGroup className="col-md-4 mb-3">
              <TextField  style={{ width: '250px',paddingTop: '2%' }}
                  label="หัวข้อ"
                  margin="normal"     
                  variant="outlined"
                  onChange={this.handleChange}
                  name="income"
                  
              />
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
              <TextField style={{ width: '250px',paddingTop: '2%'}}
                    label="รายละเอียด"
                    multiline
                    rows="5"
                    defaultValue=' '
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="detail"
                />
                <div style={{ width: '250px',paddingTop: '5%',paddingBottom: '5%'}}>
                
                </div>

                <Button style={{marginLeft:'55%',width: '100px',background: '#FFB6C1',color: '#000066',justifyContent:'center',alignItems:'center'}} onClick={this.save}>บันทึก</Button>
               
            </form>
          </FormGroup>
          </div>
          </Form>
        </Container> 
    </div>
    
  }
}
export default SaveNews;
