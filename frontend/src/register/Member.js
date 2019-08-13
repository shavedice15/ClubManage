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


export default class Member extends Component {
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
                            <Label for="address">ที่อยู่</Label>
                            <Input type="text" name="address" id="address"
                                autoComplete="address-level1"placeholder="ที่อยู่"  />
                        </FormGroup>

                        <FormGroup className="col-md-4 mb-3">
                            <Label for="address">จังหวัด</Label>
                            <Select options={techCompanies} placeholder="จังหวัด"/>
                        </FormGroup>

                        <FormGroup className="col-md-4 mb-3">
                            <Label for="address">อำเภอ</Label>
                            <Select options={techCompanies}  placeholder="อำเภอ" />
                        </FormGroup>


                        </div>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="birthday">วดป เกิด</Label>
                                <Input type="text" name="birthday" id="birthday"
                                    autoComplete="address-level1" placeholder="วดป เกิด"/>
                            </FormGroup>
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="tell">เบอร์ติดต่อ</Label>
                                <Input type="text" name="tell" id="tell"
                                    autoComplete="address-level1" placeholder="เบอร์ติดต่อ" />
                            </FormGroup>

                            <FormGroup className="col-md-4 mb-3">
                                <Label for="major">สำนักวิชา</Label>
                                <Select options={techCompanies}  placeholder="สำนักวิชา" />
                            </FormGroup>


                        </div>
                        <FormGroup>
                            <Label for="branch">สาขาวิชา</Label>
                            <Select options={techCompanies}  placeholder="สาชาวิชา" />
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-8 mb-3">
                                <Label for="nameparent">ชื่อผู้ปกครอง</Label>
                                <Input type="text" name="nameparent" id="nameparent"
                                    autoComplete="address-level1"  placeholder="ชื่อผู้ปกครอง" />
                            </FormGroup>
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="tellparent">เบอร์ผู้ปกครอง</Label>
                                <Input type="text" name="tellparent" id="tellparent"
                                    autoComplete="address-level1"  placeholder="เบอร์ผู้ปกครอง"/>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Label for="motto">คติประจำใจ</Label>
                            <Input type="text" name="motto" id="motto"
                                autoComplete="address-level1" placeholder="คิตประจำใจ" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="facebook">Facebook</Label>
                            <Input type="text" name="facebook" id="facebook"
                                autoComplete="address-level1" placeholder="facebook"/>
                        </FormGroup>


                    </Form>
                    <div className="float-right">
                        <Button style={{ background: '#000066' }} >Add Member</Button>
                    </div>
                </Container>
            </div>
        );
    }
}
