import React, { Component } from 'react';
import './App.css';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'date-fns';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//ต้องระบุตามชื่อของ ไฟล์ font
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

export default class Test extends Component {
  emptyItem = {
    nameId: '',
    startDate: '',
    endDate: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      setItem: this.emptyItem,
      x:'xxx',
      memberClub:'',
      club: [],
      adviser: [],
      position: [],
      type:[],
      member:[],
      major:[],
      summember:[],
    };
  }


  componentDidMount() {
    console.log(this.props.id)
    fetch('http://localhost:8080/findClub/'+this.props.id)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });

      fetch('http://localhost:8080/findClub/'+this.props.id)
      .then(response => response.json())
      .then(data => this.setState({adviser: data.adviser}))
      .catch((error) => {
        console.log("Error"+ error);
      });

      fetch('http://localhost:8080/findClub/'+this.props.id)
      .then(response => response.json())
      .then(data => this.setState({type: data.typeClub}))
      .catch((error) => {
        console.log("Error"+ error);
      });

      fetch('http://localhost:8080/findClub/'+this.props.id)
      .then(response => response.json())
      .then(data => this.setState({major: data.majorid}))
      .catch((error) => {
        console.log("Error"+ error);
      });



      fetch('http://localhost:8080/myClubs/'+this.props.id+'/1')
      .then(response => response.json())
      .then(data => this.setState({member: data.member}))
      .catch((error) => {
        console.log("Error"+ error);
      });

      // fetch('http://localhost:8080/myClubs/'+this.props.id+'/1')
      // .then(response => response.json())
      // .then(data => this.setState({major: data}))
      // .catch((error) => {
      //   console.log("Error"+ error);
      // });

      fetch('http://localhost:8080/memberClub/'+this.props.id)
      .then(response => response.json())
      .then(data => this.setState({summember: data}))
      .catch((error) => {
        console.log("Error"+ error);
      });
    
  }






  
  
  printPDF() {
    const {club ,type , member ,major ,summember} = this.state;
    const {adviser} = this.state;


    console.log("PDF");
    console.log(club.clubName);
    console.log(type.typeClub);
    console.log(adviser.name);
    console.log(adviser.affiliates);
    console.log("------------------")
    console.log(club.clubName);
    console.log(type.typeClub);
    console.log(member.name)
    console.log(club.clubName);
    console.log("------------------")
    console.log(member.name)
    console.log(member.major)
    console.log(member.studentid)
    console.log(member.grad)
    console.log(club.clubName);
    console.log(type.typeClub);

    console.log(adviser.name);
    console.log(adviser.affiliates);
    console.log(club.objective);
    console.log(club.activities);
    console.log("------------------")
    console.log(club.clubName);
    console.log(member.name)
    console.log(adviser.name);

      var externalDataRetrievedFromServer = [
    ];
   
  
   table(externalDataRetrievedFromServer, ['ลำดับที่','ชื่อ_นามสกุล','สำนักวิชา','รหัสประจำตัว','เกรดเฉลี่ย'])
 
     var count = 0;

     if(true){
       summember.map(x =>{
        externalDataRetrievedFromServer.push({ลำดับที่: (count+1),ชื่อ_นามสกุล:x.member.name,สำนักวิชา:x.member.major,รหัสประจำตัว:x.member.studentid,เกรดเฉลี่ย:x.member.grad})
        count++;
      })
   }


    function buildTableBody(data, columns) {
      var body = [];
  
      body.push(columns);
  
      data.forEach(function(row) {
          var dataRow = [];
  
          columns.forEach(function(column) {
              dataRow.push(row[column].toString());
          })
  
          body.push(dataRow);
      });
  
      return body;
  }
  
  function table(data, columns) {
      return {
          table: {
              widths: [50, 150,70,60,50],
              headerRows: 1,
              body: buildTableBody(data, columns),style: 'header',
           
          },margin: [40,0,10,10]
      };
  }


    var dataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4RDaRXhpZgAATU0AKgAAAAgABAE7AAIAAAAFAAAISodpAAQAAAABAAAIUJydAAEAAAAKAAAQyOocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERFTEwAAAAFkAMAAgAAABQAABCekAQAAgAAABQAABCykpEAAgAAAAM0MQAAkpIAAgAAAAM0MQAA6hwABwAACAwAAAiSAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAxOToxMDowNyAwOTo1Mjo1MAAyMDE5OjEwOjA3IDA5OjUyOjUwAAAARABFAEwATAAAAP/hCxdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj48cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIi8+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPjx4bXA6Q3JlYXRlRGF0ZT4yMDE5LTEwLTA3VDA5OjUyOjUwLjQxMjwveG1wOkNyZWF0ZURhdGU+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzpjcmVhdG9yPjxyZGY6U2VxIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpsaT5ERUxMPC9yZGY6bGk+PC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMABwUFBgUEBwYFBggHBwgKEQsK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"
    var docDefinition = {
      pageSize: 'A4',
      content: [
        {
          columns: [
            {
              image: dataUrl,
              fit: [80, 100],
			        margin: [35,0],
                },
            { text: 'บันทึกข้อความรี', fontSize: 15.5 ,margin: [60, 0, 0, 0],	style: 'header'},
            { text: '\nมหาวิทยาลัยเทคโนโลยีสุรนารี', fontSize: 15.5 , 	margin: [-140,0,0,0],	style: 'header' , },
          ]
        },
        { text: 'หน่วยงาน  สภานักศึกษา องค์การนักศึกษา         โทรศัพท์ 3141', 
        fontSize: 15.5 ,margin: [40, 0, 40, 0], },
        { text: 'ที่    สอมทส. ..../.......                                  วันที่ ....... เดือน......................... พ.ศ. ................',
         fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: 'เรื่อง      ขออนุมัติจัดตั้งชมรมและแต่งตั้งอาจารย์ที่ปรึกษาชมรม',  
         fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: '_____________________________________________________________________________'
        , fontSize: 15.5 ,margin: [40, 0, 40, 0], },
        { text: 'เรียน      อธิการบดี        ', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
        { text: 'ตามที่ สภานักศึกษา องค์การนักศึกษา ได้ประชุมเพื่อพิจารณาเห็นชอบให้มีการจัดตั้งชมรม', fontSize: 15.5  ,margin: [100, 0, 40, 0],},
        { text: 'ในสังกัดองค์การบริหาร องค์การนักศึกษา เมื่อ วันที่ ............ เดือน .................................. พ.ศ. .................        '
        , fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: 'ณ ...................................................................................... โดยที่ประชุมมีมติเห็นชอบให้มีการจัดตั้งชมรม คือ ', fontSize: 15.5 ,
        margin: [40, 0, 40, 0], },
        { text: `ชมรม ${club.clubName}`, fontSize: 15.5,
        margin: [100, 0, 40, 0], },
        { text: `สังกัดด้าน ${type.typeClub}`, fontSize: 15.5 ,
        margin: [100, 0, 40, 0], },
        { text: `อาจารย์ที่ปรึกษาชมรม ${adviser.name}`, fontSize: 15.5,
        margin: [100, 0, 40, 0], },
        { text: `หน่วยงานสังกัดของอาจารย์ที่ปรึกษาชมรม ${adviser.affiliates}`
        , fontSize: 15.5 ,margin: [100, 0, 40, 2],},
        { text: 'เพื่อให้ชมรมสามารถด าเนินกิจกรรมได้ สภานักศึกษา องค์การนักศึกษา จึงใคร่ขออนุมัติ'
        , fontSize: 15.5 ,margin: [100, 0, 40, 0],},
        { text: 'จัดตั้งชมรมและแต่งตั้งอาจารย์ที่ปรึกษาชมรมดังกล่าว ตามรายละเอียดเอกสารการขอจัดตั้งชมรมที่แนบมา'
        , fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: 'จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ', fontSize: 15.5, margin: [100, 0, 40, 0],},
        { text: 'ลงชื่อ ..................................................................            ลงชื่อ ......................................................................        '
        , fontSize: 15.5 ,margin: [40, 0, 40, 0], },
        { text: '(...................................................................)                (......................................................................)'
        , fontSize: 15.5 ,margin: [60, 0, 40, 0],},
        { text: 'ประธานสภานักศึกษา องค์การนักศึกษา                อาจารย์ที่ปรึกษาสภานักศึกษา องค์การนักศึกษา', 
        fontSize: 15.5 ,margin: [65, 0, 40, 0], },
        {
         
          table: {
            widths: [270, 270],
            body: [
                 [{text:[
                {text: '1. เสนอความเห็น\n', style:'tableheader'},
								{text: ' เห็นควรอนุมัติ\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ไม่ควรอนุมัติ เพราะ .......................................................................................\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'หัวหน้างานกิจกรรมนักศึกษา\n',alignment: 'center',style:'tablefront'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',alignment: 'center',style:'tablefront'},
              ]} , 
              
              {text:[
                {text: '2. เสนอความเห็น\n', style:'tableheader'},
								{text: ' เห็นควรอนุมัติ\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ไม่ควรอนุมัติ เพราะ ........................................................................................\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'หัวหน้าส่วนกิจการนักศึกษา\n',alignment: 'center',style:'tablefront'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',style:'tablefront',alignment: 'center'},
              ]}],


              [{text:[
                {text: '3. เสนอความเห็น\n', style:'tableheader'},
								{text: ' เห็นควรอนุมัติ\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ไม่ควรอนุมัติ เพราะ ........................................................................................\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',style:'tablefront',alignment: 'center'},
                {text: '(..............................................................................)\n',style:'tablefront',alignment: 'center'},
                {text: 'รองอธิการบดีฝ่ายกิจการนักศึกษาและศิษย์เก่าสัมพันธ\n',style:'tablefront',alignment: 'center'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',style:'tablefront',alignment: 'center'},
              ]} , 
              
              {text:[
                {text: '4. ผลการพิจารณา\n', style:'tableheader'},
								{text: ' อนุมัติ\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ไม่อนุมัติ เพราะ ...........................................................................................\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'อธิการบดี\n',alignment: 'center',style:'tablefront'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',alignment: 'center',style:'tablefront'},
              ]}]
            ],
           
          }, margin: [0,0,10,1000],
        },
        

//------------------------------------------------- PAGE 2 -----------------------------------------------------------------------------------------------------------------------------------------------





{
  columns: [
    {
      image: dataUrl,
      fit: [50, 50],
      margin: [40,0],
        },
    { text: 'บันทึกข้อความรี', fontSize: 15.5 ,margin: [60, 0, 0, 0],style: 'header'},
    { text: '\nมหาวิทยาลัยเทคโนโลยีสุรนารี', fontSize: 15.5 , 	margin: [-140,0,0,0], style: 'header'},
  ]
},
        { text: 'หน่วยงาน  สภานักศึกษา องค์การนักศึกษา         โทรศัพท์ 3141', 
        fontSize: 15.5 ,margin: [40, 0, 40, 0], },
        { text: 'ที่    อมทส. (พิเศษ)                                         วันที่ ....... เดือน......................... พ.ศ. ................',
         fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: 'เรื่อง      ขออนุมัติจัดตั้งชมรม',  
         fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: '_____________________________________________________________________________'
        , fontSize: 15.5 ,margin: [40, 0, 40, 0], },
        { text: 'เรียน      ประธานสภานักศึกษา องค์การนักศึกษา        ', fontSize: 15.5 ,margin: [40, 0, 40, 5], },
        { text: 'ตามระเบียบมหาวิทยาลัยเทคโนโลยีสุรนารี ว่าด้วยองค์การนักศึกษามหาวิทยาลัย', fontSize: 15.5  ,margin: [100, 0, 40, 0],},
        { text: 'เทคโนโลยีสุรนารี พ.ศ. 2544 หมวดที่ 7 ข้อที่ 75 เรื่องการขอจัดตั้งชมรม ข้าพเจ้าพร้อมคณะประสงค'
        , fontSize: 15.5 ,margin: [40, 0, 40, 0],},
        { text: `ขออนุมัติจัดตั้งชมรม ${club.clubName} เพื่อส่งเสริมกิจกรรมนักศึกษา ด้าน ${type.typeClub} ตามรายละเอียดการขอจัดตั้งชมรมที่แนบมา`, fontSize: 15.5 ,
        margin: [40, 0, 40, 0], },
        { text: 'จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ', fontSize: 15.5, margin: [110, 5, 40, 5],},
        { text: '.................................................................. '
        , fontSize: 15.5 ,margin: [230, 0, 40, 0], },
        { text: `(  ${member.name}  )`
        , fontSize: 15.5 ,margin: [230, 0, 40, 0],},
        { text: `ประธานชมรม ${club.clubName}`, 
        fontSize: 15.5 ,margin: [220, 0, 40, 0], },
        {
         
          table: {
            widths: [250, 270],
            body: [
                 [{text:[
                {text: '1.  เสนอความเห็นในการขอจัดตั้งชมรม\n', style:'tableheader'},
								{text: 'เห็นควรให้มีการจัดตั้งชมรม เพราะ ..............................................................\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: '...................................................................................................\n',style:'tablefront'},
                {text: '...................................................................................................\n',style:'tablefront'},
                {text: '...................................................................................................\n\n',style:'tablefront'},
    
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'อาจารย์ที่ปรึกษาชมรม\n',alignment: 'center'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',alignment: 'center',style:'tablefront'},
              ]} , 
              
              {text:[
                {text: '3. ผลการพิจารณาของคณะกรรมการบริหาร องค์การนักศึกษา(พิจารณาให้แล้วเสร็จภายใน 15 วัน นับถัดจากวันรับเรื่องจากประธานคณะอนุกรรมการฯ)\n', style:'tableheader'},
								{text: ' เห็นชอบให้จัดตั้งชมรม\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ไม่เห็นชอบให้จัดตั้งชมรม เพราะ ..........................................................................\n\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'นายกองค์การบริหาร องค์การนักศึกษา\n',alignment: 'center',style:'tablefront'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',alignment: 'center',style:'tablefront'},
              ]}],


              [{text:[
                {text: '2. เสนอความเห็นประธานคณะอนุกรรมการฝ่าย \n', style:'tableheader'},
                {text: 'ฝ่าย ........................................................\n', style:'tableheader'},
                {text:'ได้ตรวจสอบนโยบายและวัตถุประสงค์ของชมรมแล้ว\n',style:'tablefront'},
								{text: ' ไม่ซ้ำซ้อนกับชมรมที่มีอยู่เดิมและเอกสารถูกต้อง\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ซ้ำซ้อนกับชมรม ......................................................................\n\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'ประธานคณะอนุกรรมการ ฝ่าย .............................................\n',alignment: 'center',style:'tablefront'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',alignment: 'center',style:'tablefront'},
              ]} , 
              
              {text:[
                {text: '4.  ผลการพิจารณา (พิจารณาให้แล้วเสร็จภายใน 45 วัน นับถัดจากวันรับเรื่องจากคณะกรรมการบริหาร องค์การนักศึกษา)\n', style:'tableheader'},
								{text: ' เห็นชอบให้จัดตั้งชมรม\n', margin: [65, 0, 40, 0],style:'tablefront'},
                {text: ' ไม่เห็นชอบให้จัดตั้งชมรม เพราะ ................................................\n\n',style:'tablefront'},
                {text : 'ลงชื่อ .............................................................................\n',alignment: 'center',style:'tablefront'},
                {text: '(..............................................................................)\n',alignment: 'center',style:'tablefront'},
                {text: 'ประธานสภานักศึกษา องค์การนักศึกษา\n',alignment: 'center',style:'tablefront'},
                {text : 'วันที่ ....... เดือน......................... พ.ศ. ................',alignment: 'center',style:'tablefront'},
              ]}]
            ],
           
          }, margin: [0,0,10,1000],
        },
//-------------------------------------------------------------------- PAGE 3 -------------------------------------------------------------------------------------------------
{	 text: 'แบบการขอจัดตั้งชมรม', fontSize: 15.5 , alignment: 'center' , style: 'header'},
{	 text: `1. ข้าพเจ้า(นาย/นางสาว) ${member.name} เป็นนักศึกษาสำนักวิชา ${member.major} ชั้นปีที่ ${member.classmember} รหัสประจำตัว ${member.studentid} เกรดเฉลี่ย  ${member.grad} พร้อมกับนักศึกษาผู้ร่วมริเริ่ม มีความประสงค์จะขอจัดตั้งชมรม ${club.clubName}`, fontSize: 15.5 , margin: [40, 0, 40, 0],},
// {	 text: `เป็นนักศึกษาสำนักวิชา ${member.major} ชั้นปีที่ ..........รหัสประจำตัว ${member.studentid}`, fontSize: 15.5 ,margin: [40, 0, 40, 0],},
// {	 text: `เกรดเฉลี่ย  ${member.grad} พร้อมกับนักศึกษาผู้ร่วมริเริ่ม มีความประสงค์จะขอจัดตั้งชมรม ${club.clubName}`, fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{	 text: `เพื่อส่งเสริมกิจกรรมนักศึกษาด้าน ${type.typeClub}`, fontSize: 15.5 , margin: [40, 0, 40, 10], },
{	 text: `2. รายชื่อนักศึกษาผู้ร่วมริเริ่มก่อตั้งชมรม จำนวน ${count} คน มีดังนี้`, fontSize: 15.5 , margin: [40, 0, 40, 0],},


table(externalDataRetrievedFromServer, ['ลำดับที่','ชื่อ_นามสกุล','สำนักวิชา','รหัสประจำตัว','เกรดเฉลี่ย']),

{	 text: `3. ข้าพเจ้าและคณะได้เรียนเชิญผู้มีชื่อต่อไปนี้เป็นอาจารย์ที่ปรึกษาชมรม และท่านยินดีเป็นที่ปรึกษา คือ`, fontSize: 15.5 ,margin: [40, 10, 40, 0], },
{	 text: `ชื่อ-สกุล ${adviser.name} หน่วยงาน  ${adviser.affiliates}`, fontSize: 15.5 ,margin: [40, 0, 40, 10], },
{	 text: '4. วัตถุประสงค์ของการจัดตั้งชมรม ทั้งนี้ได้ปรึกษากับอาจารย์ที่ปรึกษาชมรมแล้ว มีดังนี้', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{	 text: `4.1 ${club.objective}`, fontSize: 15.5 ,margin: [80, 0, 40, 10], },
{	 text: '5. กิจกรรมหรือโครงการที่คิดว่าจะทำ หลังจากได้รับอนุญาตให้ตั้งชมรมได้ คือ', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{	 text: `5.1 ${club.activities}`, fontSize: 15.5 ,margin: [80, 0, 40,500], },

//------------------------------------------------------------------------------------------ PAGE 4 -----------------------------------------------------------------------------------------------------------------




{	 text: '6. รายชื่อคณะกรรมการบริหารชมรม ………………………………………………', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{
         
  table: {
    widths: [50, 150,70,60,50],
    body: [
      ['ลำดับที่','ชื่อ-นามสกุล','สำนักวิชา','เกรดเฉลี่ย(มากกว่า 2.00)','ตำแหน่ง'],
      ['1','','','',''],
      ['2','','','',''],
      ['3','','','',''],
      ['4','','','',''],
      ['5','','','',''],
      ['6','','','',''],
      ['7','','','',''],
      ['8','','','',''],
      ['9','','','',''],
      ['10','','','',''],

    ],
   
  }, margin: [40,0,10,10],
},


{	 text: '*กรรมการอื่น ๆ ตามที่คณะกรรมการชมรมเห็นสมควร (ระบุต าแหน่ง)', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{	 text: '7. ข้าพเจ้าและคณะขอรับรองว่า จะไม่ท ากิจกรรมใด ๆ ที่จะเกิดผลเสียหายต่อชื่อเสียงของหมู่คณะและของ', fontSize: 15.5 ,margin: [40, 0, 40, 0], },

{	 text: 'มหาวิทยาลัย ที่ผิดกฎระเบียบของมหาวิทยาลัย หรือผิดศีลธรรม หรือผิดกฎหมายของบ้านเมืองโดยเด็ดขาด', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{	 text: 'พร้อมกันนี้ได้แนบรายชื่อสมาชิกมาด้วยแล้ว จำนวน ................คน ', fontSize: 15.5 ,margin: [40, 0, 40, 0], },
{	 text: '...........................................................', fontSize: 15.5 ,margin: [250, 0, 40, 0], },
{	 text: `(  ${member.name} )`, fontSize: 15.5 ,margin: [250, 0, 40, 0], },
{	 text: 'ผู้ขอจัดตั้งชมรม', fontSize: 15.5 ,margin: [250, 0, 40, 0], },

{	 text: `...........................................................\n(  ${adviser.name} )\nอาจารย์ที่ปรึกษาชมรม`, fontSize: 15.5 ,margin: [250, 0, 40, 0], },


 //table(externalDataRetrievedFromServer, ['ลำดับที่','ชื่อ_นามสกุล','สำนักวิชา','รหัสประจำตัว','เกรดเฉลีย'])












],

images: {
  bee: dataUrl
},
     


//------------------------------------- END -------------------------------------------------------------------------------------------------------------     
      defaultStyle: {
        font: 'THSarabunNew'
      },
      styles: {
        header: {
          fontSize: 20,
          bold: true,
        },
        tableheader: {
          fontSize: 16,
          bold: true,
        },
        tablefront: {
          fontSize: 14,
        
        },
        subheader: {
          fontSize: 14
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 15
        }
      }
    };
    var pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
   }
//  // 4RDaRXhpZgAATU0AKgAAAAgABAE7AAIAAAAFAAAISodpAAQAAAABAAAIUJydAAEAAAAKAAAQyOocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERFTEwAAAAFkAMAAgAAABQAABCekAQAAgAAABQAABCykpEAAgAAAAM0MQAAkpIAAgAAAAM0MQAA6hwABwAACAwAAAiSAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAxOToxMDowNyAwOTo1Mjo1MAAyMDE5OjEwOjA3IDA5OjUyOjUwAAAARABFAEwATAAAAP

  
 checkPosition() {
 
  if(this.props.position == 'สมาชิก') {
    return true;
  }
  else {
    return false;
  }
}

  render() {
    const {club , type , member , major , summember} = this.state;
    const {adviser} = this.state;
    // console.log(this.props.id)
    // console.log(club , adviser ,type  ,major ,summember)

    summember.map(x =>{
      console.log(x.member)
    })


    // console.log("ประธาน" , member)

    return (
      <div>
          <Button onClick={this.printPDF.bind(this)}
            variant="raised" color="secondary" style={{ margin: '5px' }} disabled = {this.checkPosition()}>
            Print PDF
        </Button>
      </div>
    )
  }
}

