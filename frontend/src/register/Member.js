import React, { Component } from 'react'
import '../App.css';
import AppNavbar from '../AppNavbar';
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
import {auth} from '../firebase';
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


export default class Member extends Component {

    emptyItem = {
        changwatId: '',
        aumphoeId: '',
        majorId: '',
        branchId: '',

        studentid: '',
        name: '',
        nickname: '',
        address: '',
        motto: '',
        birthday: '',
        tell: '',
        nameparent: '',
        tellparent: '',
        facebook: '',
        changwatname: '',
        branch: '',
        major: '',
        aumphoename: '',

        email: '',
        password: ''
    };


    constructor(props) {
        super(props);
        this.state = {
            changwat: [],
            aumphoe: [],
            major: [],
            branch: [],
            setItem: this.emptyItem,


        };
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }



    componentDidMount() {
        fetch('http://localhost:8080/api/changwats')
            .then(response => response.json())
            .then(data => this.setState({ changwat: data }));

        // fetch('http://localhost:8080/api/aumphoes')
        //     .then(response => response.json())
        //     .then(data => this.setState({ aumphoe: data }));

        fetch('http://localhost:8080/api/majors')
            .then(response => response.json())
            .then(data => this.setState({ major: data }));

        // fetch('http://localhost:8080/api/branchs')
        //     .then(response => response.json())
        //     .then(data => this.setState({ branch: data }));


    }
    handleChange(event) {
        const value = event.target.value;
        console.log(value)
        const name = event.target.name;
        console.log(name)
        const item = { ...this.state.setItem };
        item[name] = value;
        this.setState({ setItem: item });

        console.log(item.changwatId);
        console.log(item.majorId);

        if (item.changwatId != '') {
            fetch(`http://localhost:8080/api/findAumphoe/${item.changwatId}`)
                .then(response => response.json())
                .then(data => this.setState({ aumphoe: data }));
        }

        if (item.majorId != '') {
            fetch(`http://localhost:8080/api/findBranch/${item.majorId}`)
                .then(response => response.json())
                .then(data => this.setState({ branch: data }));
        }
    }


    async handleSubmit(event) {

        event.preventDefault();
        const { setItem } = this.state;
        console.log(setItem)

        const Studentid = setItem.studentid
        const Name = setItem.name
        const Nickname = setItem.nickname
        const Address = setItem.address
        const Tell = setItem.tell
        const Nameparent = setItem.nameparent
        const Tellparent = setItem.tellparent
        const Motto = setItem.motto
        const Facebook = setItem.facebook


        console.log(Motto.match(/^[A-Za-z]{1,20}$/))
        console.log(Facebook.match(/^[A-Za-z]{1,20}$/))
        console.log(Name.match(/\w*\s\w*/))
        console.log(Tell.match(/^[0-9]{10}$/))
        console.log(Tellparent.match(/^[0-9]{10}$/))
        console.log(Nameparent.match(/\w*\s\w*/))
        console.log(Nickname.match(/^[A-Za-z]{1,20}$/))
        console.log(Studentid.match(/^B[0-9]{7}$/))
        console.log(Address.match(/^\w*\s\w*\.\w*/))




        if (Tell.match(/^[0-9]{10}$/) != null
            &&
            Motto.match(/^[A-Za-z]{1,20}$/) != null
            &&
            Facebook.match(/^[A-Za-z]{1,20}$/) != null
            &&
            Name.match(/\w*\s\w*/) != null
            &&
            Tellparent.match(/^[0-9]{10}$/) != null
            &&
            Nameparent.match(/\w*\s\w*/) != null
            &&
            Nickname.match(/^[A-Za-z]{1,20}$/) != null
            &&
            Studentid.match(/^B[0-9]{7}$/) != null
            &&
            Address.match(/^\w*\s\w*\.\w*/) != null
        ) {
            console.log('yes')
            await fetch(`http://localhost:8080/api/memberx/${setItem.changwatId}/${setItem.aumphoeId}/${setItem.majorId}/${setItem.branchId}/${setItem.email}/${setItem.password}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setItem),
            }).then(data => {
                    auth.createUserWithEmailAndPassword(setItem.email, setItem.password).then(() => {
                        console.log(data)
                        window.location = '/login'
                    }, (error) => {
                        console.log(error.message)
                    });
                    
                }).catch((error) => {
                    console.log("Error"+ error);
                    alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
                });

        }
        else {
            alert('กรอกข้อมูลให้ครบ และถูกต้อง')
        }

        //this.props.history.push('/shows');
    }




    render() {
        console.log(this.state.setItem)
        const { changwat, aumphoe, major, branch, setItem } = this.state;

        const changwatlist = changwat.map(ch => {
            return (
                <MenuItem value={ch.id}>{ch.changwat}</MenuItem>
            )
        });
        const aumphoelist = aumphoe.map(a => {
            return (
                <MenuItem value={a.id}>{a.aumphoe}</MenuItem>
            )
        });
        const majorlist = major.map(mj => {
            return (
                <MenuItem value={mj.id}>{mj.major}</MenuItem>
            )
        });

        const branchlist = branch.map(br => {
            return (
                <MenuItem value={br.id}>{br.branch}</MenuItem>
            )
        });

        console.log(majorlist)

        return (
            <div>
                <AppBar
                position="fixed"
                style={{ background: '#000066' }}
            >
                <Toolbar>
                    <Typography variant="h6" style={{ width: '90%'}} noWrap>
                        Club Management System
                    </Typography>
                </Toolbar>
                </AppBar>

                <Container style={{ paddingTop: '30px' }}>

                    <Form onSubmit={this.handleSubmit}>
                        <from>
                            <fieldset className='my-fieldset'>
                                <legend className='login-legend' >Personalia:</legend>
                                <div className="row" >
                                    <AvForm className="col-md-3 mb-3" className="a">
                                        <AvField name="studentid" label="รหัสนักศึกษา" type="text" errorMessage="Invalid name" validate={{
                                            required: { value: true },
                                            pattern: { value: '^B[0-9]{7}$' },
                                        }}
                                            value={setItem.studentid || ''}
                                            onChange={this.handleChange}
                                        />
                                    </AvForm>

                                    <AvForm className="col-md-3 mb-3" className="a">
                                        <AvField name="name" label="ชื่อ-สกุล" type="text" errorMessage="Invalid name" 
                                         validate={{
                                             required: { value: true },
                                             pattern: { value: /\w*\s\w*/ }
                                         }}
                                        value={setItem.name || ''}
                                            onChange={this.handleChange}
                                        />
                                    </AvForm>

                                     <AvForm className="col-md-3 mb-3" className="a">
                                        <AvField name="nickname" label="ชื่อเล่น" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.nickname || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>


                                    
                                    {/* <FormGroup className="col-md-3 mb-3" className='a'>
                                        <Label for="student" className='c'>รหัสนักศึกษา</Label>
                                        <Input type="text" name="studentid" id="studentid" value={setItem.studentid || ''}
                                            onChange={this.handleChange}
                                            autoComplete="studentid" placeholder="รหัสนักศึกษา" />
                                    </FormGroup> */}
                                    {/* <FormGroup className='a , b'>
                                        <Label for="name" >ชื่อ-สกุล</Label>
                                        <Input type="text" name="name" id="name" value={setItem.name || ''}
                                            onChange={this.handleChange}
                                            autoComplete="name" placeholder="ชื่อ-สกุล"
                                        />
                                    </FormGroup> */}
                                    {/* <FormGroup className="col-md-3 mb-3" className='a'>
                                        <Label for="nickname">ชื่อเล่น</Label>
                                        <Input type="text" name="nickname" id="nickname" value={setItem.nickname || ''}
                                            onChange={this.handleChange}
                                            autoComplete="nickname" placeholder="ชื่อเล่น" />
                                    </FormGroup> */}
                                </div>
                                <div className="row" >
                                <AvForm className='a , b'>
                                        <AvField name="address" label="ที่อยู่" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^\w*\s\w*\.\w*/ }
                                        }}
                                        value={setItem.address || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    {/* <FormGroup className='a , b' >
                                        <Label for="address">ที่อยู่</Label>
                                        <Input type="text" name="address" id="address" value={setItem.address || ''}
                                            onChange={this.handleChange}
                                            autoComplete="address" placeholder="ที่อยู่" />
                                    </FormGroup> */}

                                         <AvForm className='a , b'>
                                        <AvField name="tell" label="เบอร์ติดต่อ" type="text" errorMessage="Invalid number" 
                                        validate={{
                                             required: { value: true },
                                             pattern: { value: '^[0-9]{10}$' }
                                      }}
                                        value={setItem.tell || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>

                                    {/* <FormGroup className="col-md-4 mb-3" className='a'>
                                        <Label for="tell">เบอร์ติดต่อ</Label>
                                        <Input type="text" name="tell" id="tell" value={setItem.tell || ''}
                                            onChange={this.handleChange}
                                            autoComplete="tell" placeholder="เบอร์ติดต่อ" />
                                    </FormGroup> */}
                                    <FormGroup className="col-md-8 mb-3" className='a'>
                                        <Label for="birthday">วดป เกิด</Label>
                                        <form className={useStyles.container} noValidate>
                                            <TextField
                                                id="date"

                                                type="date"
                                                defaultValue="2017-05-24"
                                                className={useStyles.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    readOnly: true,
                                                }}
                                                name="birthday"
                                                onChange={this.handleChange}
                                            />
                                        </form>
                                    </FormGroup>
                                </div>
                            </fieldset>
                        </from>
                        <form>
                            <fieldset className='my-fieldset'>
                                <legend className='legend' >Address:</legend>
                                <div className='a'>
                                    <FormGroup className="col-md-8 mb-3">
                                        <InputLabel htmlFor="tag-helper">จังหวัด</InputLabel>
                                        <Select
                                            value={this.state.setItem.changwatId}
                                            onChange={this.handleChange}
                                            style={{ width: '50%', textAlign: 'center' }}
                                            input={<OutlinedInput name="changwatId" />}
                                            onAnimationEnd={this.x}

                                        >
                                            <MenuItem value="" ><em>None</em></MenuItem>
                                            {changwatlist}
                                        </Select>
                                    </FormGroup>
                                    <FormGroup className="col-md-8 mb-3">
                                        <InputLabel htmlFor="tag-helper">อำเภอ</InputLabel>
                                        <Select placeholder="อำเภอ"
                                            value={this.state.setItem.aumphoeId}
                                            onChange={this.handleChange}
                                            style={{ width: '50%', textAlign: 'center' }}
                                            input={<OutlinedInput name="aumphoeId" />}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {aumphoelist}
                                        </Select>
                                    </FormGroup>
                                </div>
                                <div className='a'>
                                    <FormGroup className="col-md-8 mb-3">
                                        <InputLabel htmlFor="tag-helper">สำนักวิชา</InputLabel>
                                        <Select placeholder="สำนักวิชา"
                                            value={this.state.setItem.majorId}
                                            onChange={this.handleChange}
                                            style={{ width: '50%', textAlign: 'center' }}
                                            input={<OutlinedInput name="majorId" />}

                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {majorlist}
                                        </Select>
                                    </FormGroup>
                                    <FormGroup className="col-md-8 mb-3">
                                        <InputLabel htmlFor="tag-helper">สาขาวิชา</InputLabel>
                                        <Select placeholder="สาชาวิชา"
                                            value={this.state.setItem.branchId}
                                            onChange={this.handleChange}
                                            style={{ width: '50%', textAlign: 'center' }}
                                            input={<OutlinedInput name="branchId" />}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {branchlist}
                                        </Select>
                                    </FormGroup>
                                </div>
                            </fieldset>
                        </form>
                        <form>
                            <fieldset className='my-fieldset'>
                                <legend className='legend' >Parent:</legend>
                                <div className="row" className='a'>
                                <AvForm className="col-md-8 mb-3" >
                                        <AvField name="nameparent" label="ชื่อผู้ปกครอง" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /\w*\s\w*/ }
                                        }}
                                        value={setItem.nameparent || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    {/* <FormGroup className="col-md-8 mb-3">
                                        <Label for="nameparent">ชื่อผู้ปกครอง</Label>
                                        <Input type="text" name="nameparent" id="nameparent" value={setItem.nameparent || ''}
                                            onChange={this.handleChange}
                                            autoComplete="nameparent" placeholder="ชื่อผู้ปกครอง" />
                                    </FormGroup> */}
                                     <AvForm className="col-md-8 mb-3" >
                                        <AvField name="tellparent" label="เบอร์ผู้ปกครอง" type="text" errorMessage="Invalid name" 
                                     validate={{
                                             required: { value: true },
                                         pattern: { value: '^[0-9]{10}$' }
                                     }}
                                        value={setItem.tellparent || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    {/* <FormGroup className="col-md-4 mb-3">
                                        <Label for="tellparent">เบอร์ผู้ปกครอง</Label>
                                        <Input type="text" name="tellparent" id="tellparent" value={setItem.tellparent || ''}
                                            onChange={this.handleChange}
                                            autoComplete="tellparent" placeholder="เบอร์ผู้ปกครอง" />
                                    </FormGroup> */}
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="motto" label="คติประจำใจ" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.motto || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    {/* <FormGroup className="col-md-8 mb-3">
                                        <Label for="motto">คติประจำใจ</Label>
                                        <Input type="text" name="motto" id="motto" value={setItem.motto || ''}
                                            onChange={this.handleChange}
                                            autoComplete="motto" placeholder="คิตประจำใจ" />
                                    </FormGroup> */}
                                      <AvForm className="col-md-8 mb-3" >
                                        <AvField name="facebook" label="Facebook" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: /^[A-Za-z]{1,20}$/ }
                                        }}
                                        value={setItem.facebook || ''}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    {/* <FormGroup className="col-md-8 mb-3">
                                        <Label for="facebook">Facebook</Label>
                                        <Input type="text" name="facebook" id="facebook" value={setItem.facebook || ''}
                                            onChange={this.handleChange}
                                            autoComplete="facebook1" placeholder="facebook" />
                                    </FormGroup> */}
                                </div>
                            </fieldset>

                            <fieldset className='my-fieldset'>
                            <legend className='legend' >E-mail:</legend>
                                <div className="row" className='a'>
                                
                                     <AvForm className="col-md-8 mb-3" >
                                        <AvField name="email" label="E-mail" type="text" errorMessage="Invalid name" 
                                     validate={{
                                             required: { value: true },
                                         pattern: { value: '^[0-9]' }
                                     }}
                                        value={setItem.email}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                    
                                    <AvForm className="col-md-8 mb-3" >
                                        <AvField name="password" label="password" type="text" errorMessage="Invalid name" 
                                        validate={{
                                            required: { value: true },
                                            pattern: { value: '^[0-9]' }
                                        }}
                                        value={setItem.password}
                                        onChange={this.handleChange}
                                        />
                                    </AvForm>
                                   
                                </div>
                            </fieldset>
                        </form>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>
                        </FormGroup>
                        
                    </Form>

                </Container>
            </div>
        );
    }
}


