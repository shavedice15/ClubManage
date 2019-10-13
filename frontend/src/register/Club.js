import React, { Component } from 'react'
import '../App.css';
import AppNavbar from '../AppNavbar';

import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from '@material-ui/core/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {auth} from '../firebase';
const techCompanies = [
    { label: "Apple", value: 1 },
    { label: "Facebook", value: 2 },
    { label: "Netflix", value: 3 },
    { label: "Tesla", value: 4 },
    { label: "Amazon", value: 5 },
    { label: "Alphabet", value: 6 },
];


export default class Club extends Component {

    emptyItem = {
        majorId: '',
        typeId: '',
        adviserId: '',


        clubName: '',
        studentid: '',
        studentname: '',
        grad: '',
        tell: '',
        objective: '',
        activities: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            typeclub: [],
            adviser: [],
            major: [],
            profile:[],
            majorId:[],
            setItem: this.emptyItem,


        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                fetch('http://localhost:8080/username/'+user.email)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ profile: data.member })
                        this.setState({ majorId: data.member.majorid })
                        
                    });
            }else{
                window.location = '/login';
            }
        })  

        fetch('http://localhost:8080/api/majors')
            .then(response => response.json())
            .then(data => this.setState({ major: data }));

        fetch('http://localhost:8080/api/advisers')
            .then(response => response.json())
            .then(data => this.setState({ adviser: data }));

        fetch('http://localhost:8080/api/types')
            .then(response => response.json())
            .then(data => this.setState({ typeclub: data }));

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
    }


    async handleSubmit(event) {

        event.preventDefault();
        const { setItem, profile } = this.state;
        console.log(setItem)

        const Studentid = setItem.studentid
        const Studentname = setItem.studentname
        const Grad = setItem.grad
        const Tell = setItem.tell
        const Clubname = setItem.clubName
        const Objective = setItem.objective
        const Activities = setItem.activities

        console.log(Activities.match(/^[ก-๙]{1,20}$/))
        console.log(Objective.match(/^[ก-๙]{1,20}$/))
        console.log(Clubname.match(/^[A-Za-z]{1,20}$/))
        console.log(Tell.match(/^[0-9]{10}$/))
        console.log(Grad.match(/^[0-9]+\.[0-9]{2}$/))
        console.log(Studentname.match(/\w*\s\w*/))
        console.log(Studentid.match(/^B[0-9]{7}$/))


        if (//Studentid.match(/^B[0-9]{7}$/) != null && 
    //Studentname.match(/\w*\s\w*/) != null &&
     //       Grad.match(/^[0-9]+\.[0-9]{2}$/) != null && 
       //     Tell.match(/^[0-9]{10}$/)  != null && 
         //   Clubname.match(/^[A-Za-z]{1,20}$/) != null && 
           // Objective.match(/^[ก-๙]{1,20}$/) != null && 
            /*Activities.match(/^[ก-๙]{1,20}$/)  != null*/ true) {

            console.log('yes')
            await fetch(`http://localhost:8080/api/newClub/${setItem.majorId}/${setItem.typeId}/${setItem.adviserId}/${profile.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setItem),
            });

        }
        else {
            alert('กรอกข้อมูลให้ครบ และถูกต้อง')
        }
         this.props.history.push('/ProfileMember');
    }



    render() {
        console.log(this.state.setItem)
        const {profile, majorId} = this.state;

        this.emptyItem.studentid = profile.studentid
        this.emptyItem.studentname = profile.name
        this.emptyItem.tell = profile.tell
        this.emptyItem.grad = profile.grad
        this.emptyItem.majorId = majorId.id

        const { typeclub, adviser, major, setItem } = this.state;
        console.log(this.state.major)
        console.log(this.state.adviser)
        console.log(this.state.typeclub)


        const typeclublist = typeclub.map(ch => {
            return (
                <MenuItem value={ch.id}>{ch.typeClub}</MenuItem>
            )
        });
        const adviserlist = adviser.map(a => {
            return (
                <MenuItem value={a.id}>{a.name}</MenuItem>
            )
        });
        const majorlist = major.map(mj => {
            return (
                <MenuItem value={mj.id}>{mj.major}</MenuItem>
            )
        });


        return (
            <div>
                <AppNavbar />
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <from>
                            <fieldset className='my-fieldset'>
                                <legend className='login-legend' >Personalia:</legend>


                                <div className="row">
                                    <FormGroup className="col-md-3 mb-3" className='a'>
                                        <Label for="studentid">รหัสนักศึกษา</Label>
                                        <Input type="text" name="studentid" id="studentid" value={setItem.studentid}
                                            onChange={this.handleChange}
                                            autoComplete="studentid" placeholder="รหัสนักศึกษา" />
                                    </FormGroup>
                                    <FormGroup className="col-md-6 mb-3" className='a'>
                                        <Label for="studentname">ชื่อ-สกุล</Label>
                                        <Input type="text" name="studentname" id="studentname" value={setItem.studentname || ''}
                                            onChange={this.handleChange}
                                            autoComplete="studentname" placeholder="ชื่อ-สกุล" />
                                    </FormGroup>
                                    <FormGroup className="col-md-3 mb-3" className='a'>
                                        <Label for="grad">เกรด</Label>
                                        <Input type="text" name="grad" id="grad" value={setItem.grad || ''}
                                            onChange={this.handleChange}
                                            autoComplete="grad" placeholder="เกรด" />
                                    </FormGroup>
                                </div>
                                <div className="row">
                                    <FormGroup className="col-md-4 mb-3" className='a'>
                                        <Label for="tell">เบอร์ติดต่อ</Label>
                                        <Input type="text" name="tell" id="tell" value={setItem.tell || ''}
                                            onChange={this.handleChange}
                                            autoComplete="tell" placeholder="เบอร์ติดต่อ" />
                                    </FormGroup>
                                    <FormGroup className="col-md-8 mb-3" className='d'>
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

                                </div>
                            </fieldset>
                        </from>



                        <from>
                            <fieldset className='my-fieldset'>
                                <legend className='login-legend' >Club:</legend>
                                <div className="row">
                                    <FormGroup className='a'>
                                        <Label for="clubName">ชื่อชมรม</Label>
                                        <Input type="text" name="clubName" id="clubName" value={setItem.clubName || ''}
                                            onChange={this.handleChange}
                                            autoComplete="clubName" placeholder="ชื่อชมรม" />
                                    </FormGroup>
                                    <FormGroup className="col-md-8 mb-3" className='d'>
                                        <InputLabel htmlFor="tag-helper">ชมรมด้าน</InputLabel>
                                        <Select placeholder="ชมรมด้าน"
                                            value={this.state.setItem.typeId}
                                            onChange={this.handleChange}
                                            style={{ width: '50%', textAlign: 'center' }}
                                            input={<OutlinedInput name="typeId" />}

                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {typeclublist}
                                        </Select>
                                    </FormGroup>
                                </div>
                                <FormGroup className="col-md-8 mb-3" className='a'>
                                    <InputLabel htmlFor="tag-helper">อาจารย์ที่ปรึกษาชมรม</InputLabel>
                                    <Select placeholder="อาจารย์ที่ปรึกษาชมรม"
                                        value={this.state.setItem.adviserId}
                                        onChange={this.handleChange}
                                        style={{ width: '50%', textAlign: 'center' }}
                                        input={<OutlinedInput name="adviserId" />}

                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {adviserlist}
                                    </Select>
                                </FormGroup>
                                <FormGroup className='a'>
                                    <Label for="objective">วัตถุประสงค์</Label>
                                    <Input type="text" name="objective" id="objective" alue={setItem.objective || ''}
                                        onChange={this.handleChange}
                                        autoComplete="objective" placeholder="วัตถุประสงค์"
                                    />
                                </FormGroup>
                                <FormGroup className='a'>
                                    <Label for="activities">กิจกรรมที่ว่าจะทำ</Label>
                                    <Input type="text" name="activities" id="activities" alue={setItem.activities || ''}
                                        onChange={this.handleChange}
                                        autoComplete="activities" placeholder="กิจกรรมที่ว่าจะทำ" />
                                </FormGroup>
                            </fieldset>
                        </from>
                        <div className="float-right">
                            <Button style={{ background: '#000066' }} type="submit" >Add Club</Button>
                        </div>
                    </Form>

                </Container>
            </div>
        )
    }
}
