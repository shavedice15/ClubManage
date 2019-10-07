import React, { Component } from 'react'
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, FormText, FormFeedback } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Select from '@material-ui/core/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {auth} from '../../firebase';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


export default class ProfileMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: []
        };
        
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                fetch('http://localhost:8080/username/'+user.email)
                    .then(response => response.json())
                    .then(data => this.setState({ profile: data.member }));
            }else{
                window.location = '/login';
            }
        })  
    }

    render() {
        const {profile} = this.state;

        return (
            <div>
                <AppNavbar />
                <Container style={{ paddingTop: '0px' }}>

                    <Form onSubmit={this.handleSubmit}>
                        <from>
                            <fieldset className='my-fieldset'>
                                <legend className='login-legend' >Personalia:</legend>
                                <div className="row" >
                                    <AvForm className="col-md-3 mb-3" className="a">
                                        <Label>รหัสนักศึกษา</Label><br/>
                                        <TextField name="studentid"
                                            defaultValue=" "
                                            value={profile.studentid}
                                            InputProps={{
                                                readOnly: true,
                                            }}   
                                            variant="outlined"
                                        />
                                    </AvForm>

                                    <AvForm className="col-md-3 mb-3" className="a">
                                    <Label>ชื่อ-สกุล</Label><br/>
                                        <TextField name="name"
                                            defaultValue=" "
                                            value={profile.name}
                                            InputProps={{
                                                readOnly: true,
                                            }}  
                                            variant="outlined"
                                        />
                                    </AvForm>

                                     <AvForm className="col-md-3 mb-3" className="a">
                                        <Label>ชื่อเล่น</Label><br/>
                                        <TextField name="nickname"
                                            defaultValue=" "
                                            value={profile.nickname}
                                            InputProps={{
                                                readOnly: true,
                                            }} 
                                            variant="outlined"
                                        />
                                    </AvForm>
                                </div>

                                <div className="row" >
                                <AvForm className='a , b'>
                                        <Label>ที่อยู่</Label><br/>
                                        <TextField name="address"
                                            defaultValue=" "
                                            value={profile.address}
                                            InputProps={{
                                                readOnly: true,
                                            }} 
                                            variant="outlined"
                                        />
                                    </AvForm>

                                    <AvForm className='a , b'>
                                        <Label>เบอร์ติดต่อ</Label><br/>
                                        <TextField name="tell"
                                            defaultValue=" "
                                            value={profile.tell}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            variant="outlined"
                                        />
                                    </AvForm>

                                    <FormGroup className="col-md-8 mb-3" className='a'>
                                        <Label>วดป เกิด</Label><br/>
                                            <TextField name="birthday"
                                                defaultValue=" "
                                                value={profile.birthday}
                                                InputProps={{
                                                    readOnly: true,
                                                }} 
                                                variant="outlined"
                                            />
                                    </FormGroup>
                                </div>
                            </fieldset>
                        </from>
                        <form>
                            <fieldset className='my-fieldset'>
                                <legend className='legend' >Address:</legend>
                                <div className='a'>
                                    <FormGroup className="col-md-8 mb-3">
                                        <Label>จังหวัด</Label><br/>
                                            <TextField name="changwat"
                                                defaultValue=" "
                                                value={profile.changwatname}
                                                InputProps={{
                                                    readOnly: true,
                                                }} 
                                                variant="outlined"
                                            />
                                    </FormGroup>

                                    <FormGroup className="col-md-8 mb-3">
                                            <Label>อำเภอ</Label><br/>
                                            <TextField name="aumphoe"
                                                defaultValue=" "
                                                value={profile.aumphoename}
                                                InputProps={{
                                                    readOnly: true,
                                                }} 
                                                variant="outlined"
                                            />
                                    </FormGroup>
                                </div>
                                <div className='a'>
                                    <FormGroup className="col-md-8 mb-3">
                                            <Label>สำนักวิชา</Label><br/>
                                            <TextField name="major"
                                                defaultValue=" "
                                                value={profile.major}
                                                InputProps={{
                                                    readOnly: true,
                                                }} 
                                                variant="outlined"
                                            />
                                    </FormGroup>
                                    <FormGroup className="col-md-8 mb-3">
                                        <Label>สาขาวิชา</Label><br/>
                                            <TextField name="branch"
                                                defaultValue=" "
                                                value={profile.branch}
                                                InputProps={{
                                                    readOnly: true,
                                                }} 
                                                variant="outlined"
                                            />
                                    </FormGroup>
                                </div>
                            </fieldset>
                        </form>
                        <form>
                            <fieldset className='my-fieldset'>
                                <legend className='legend' >Parent:</legend>
                                <div className="row" className='a'>
                                <AvForm className="col-md-8 mb-3" >
                                        <Label>ชื่อผู้ปกครอง</Label><br/>
                                        <TextField name="nameparent"
                                            defaultValue=" "
                                            value={profile.nameparent}
                                            InputProps={{
                                                readOnly: true,
                                            }} 
                                            variant="outlined"
                                        />
                                    </AvForm>
                                    
                                     <AvForm className="col-md-8 mb-3" >
                                        <Label>เบอร์ผู้ปกครอง</Label><br/>
                                        <TextField name="tellparent"
                                            defaultValue=" "
                                            value={profile.tellparent}
                                            InputProps={{
                                                readOnly: true,
                                            }} 
                                            variant="outlined"
                                        />
                                    </AvForm>
            
                                    <AvForm className="col-md-8 mb-3" >
                                        <Label>คติประจำใจ</Label><br/>
                                        <TextField name="motto"
                                            defaultValue=" "
                                            value={profile.motto}
                                            InputProps={{
                                                readOnly: true,
                                            }} 
                                            variant="outlined"
                                        />
                                    </AvForm>
                                    
                                      <AvForm className="col-md-8 mb-3" >
                                        <Label>facebook</Label><br/>
                                        <TextField name="facebook"
                                            defaultValue=" "
                                            value={profile.facebook}
                                            InputProps={{
                                                readOnly: true,
                                            }} 
                                            variant="outlined"
                                        />
                                    </AvForm>
                                    
                                </div>
                            </fieldset>
                        </form>
                        <FormGroup style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Button style={{marginLeft:40}} color="primary" tag={Link} to={"/members/"+profile.id}>แก้ไข</Button>
                        </FormGroup>
                        
                    </Form>

                </Container>
            </div>
        );
    }
}


