import React, { Component } from 'react'
import '../App.css';
import AppNavbar from '../AppNavbar';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const techCompanies = [
    { label: "Apple", value: 1 },
    { label: "Facebook", value: 2 },
    { label: "Netflix", value: 3 },
    { label: "Tesla", value: 4 },
    { label: "Amazon", value: 5 },
    { label: "Alphabet", value: 6 },
];


export default class Club extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container>
                    <Form>
                        <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                                <Label for="student">รหัสนักศึกษา</Label>
                                <Input type="text" name="student" id="student"
                                    autoComplete="address-level1" placeholder="รหัสนักศึกษา"/>
                            </FormGroup>
                            <FormGroup className="col-md-6 mb-3">
                                <Label for="name">ชื่อ-สกุล</Label>
                                <Input type="text" name="name" id="name"
                                    autoComplete="name" placeholder="ชื่อ-สกุล"/>
                            </FormGroup>
                            <FormGroup className="col-md-3 mb-3" >
                                <Label for="nickname">ชื่อเล่น</Label>
                                <Input type="text" name="nickname" id="nickname"
                                    autoComplete="address-level1" placeholder="ชื่อเล่น" />
                            </FormGroup>
                        </div>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="tell">เบอร์ติดต่อ</Label>
                                <Input type="text" name="tell" id="tell"
                                    autoComplete="address-level1" placeholder="เบอร์ติดต่อ" />
                            </FormGroup>
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="major">สำนักวิชา</Label>
                                <Select options={techCompanies}  placeholder="สำนักวิชา" />
                            </FormGroup>

                            <FormGroup className="col-md-4 mb-3">
                                <Label for="branch">สาขาวิชา</Label>
                                <Select options={techCompanies}  placeholder="สาชาวิชา" />
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="col-md-5 mb-3">
                                <Label for="nameparent">ชื่อชมรม</Label>
                                <Input type="text" name="nameparent" id="nameparent"
                                    autoComplete="address-level1"  placeholder="ชื่อชมรม"/>
                            </FormGroup>

                            <FormGroup className="col-md-5 mb-3">
                                <Label for="studentactivity">กิจกรรมนักษาด้าน</Label>
                                <Input type="text" name="studentactivity" id="studentactivity"
                                    autoComplete="address-level1"  placeholder="กิจกรรมนักษาด้าน"/>
                            </FormGroup>

                        </div>
                        <FormGroup>
                            <Label for="clubadvisor">อาจารย์ที่ปรึกษาชมรม</Label>
                            <Input type="text" name="clubadvisor" id="clubadvisor"
                                autoComplete="address-level1" placeholder="อาจารย์ที่ปรึกษาชมรม" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="objective">วัตถุประสงค์</Label>
                            <Input type="text" name="objective" id="objective"
                                autoComplete="address-level1" placeholder="วัตถุประสงค์" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="activities">กิจกรรมที่ว่าจะทำ</Label>
                            <Input type="text" name="activities" id="activities"
                                autoComplete="address-level1" placeholder="กิจกรรมที่ว่าจะทำ" />
                        </FormGroup>
                    </Form>
                    <div className="float-right">
                        <Button style={{ background: '#000066' }} >Add Club</Button>
                    </div>
                </Container>
            </div>
        )
    }
}
