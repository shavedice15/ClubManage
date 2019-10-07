import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import {storage} from '../../firebase';
import {auth} from '../../firebase';

class SaveBudget extends Component {
  emptyItem = {
    date: '',
    income: '',
    pay: '',
    detail: '',
    note: '-'
  };
  
  constructor(props) {
    super(props);
    this.state = {club: [],
                  image: [],
                  url: '',
                  progress: 0,
                  currentUser:null,
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
      }else{
        window.location = '/loginOrganization';
      }
    })

    fetch('http://localhost:8080/findClub/'+this.props.match.params.clubId)
      .then(response => response.json())
      .then(data => this.setState({club: data}))
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
  }

  save = () => {
    const {setItem} = this.state;
    const {club} = this.state;
    const {url} = this.state;

    if(setItem.income != '' & setItem.pay != ''){
      alert('โปรดกรอกแค่รายรับ หรือ รายจ่ายเท่านั้น');
    }else if(setItem.income != '' & setItem.pay == '' & setItem.date != '' & setItem.detail != '' & url == '' & setItem.note != '') {//รายรับ ไม่อัพรูป

      fetch(`http://localhost:8080/saveBudgetNotUrl/${club.clubId}/${setItem.date}/${setItem.income}/0/${setItem.detail}/${setItem.note}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      }).then(data => console.log(data),
                alert('บันทึกสำเร็จ'),
                window.location.reload())
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })
    }else if(setItem.income != '' & setItem.pay == '' & setItem.date != '' & setItem.detail != '' & url != '' & setItem.note != '') {//รายรับ อัพรูป

      fetch(`http://localhost:8080/saveBudget/${club.clubId}/${setItem.date}/${setItem.income}/0/${setItem.detail}/${setItem.note}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url),
      }).then(data => console.log(data),
                alert('บันทึกสำเร็จ'),
                window.location.reload())
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })

    }else if(setItem.income == '' & setItem.pay != '' & setItem.date != '' & setItem.detail != '' & url != '' & setItem.note != ''){ //รายจ่าย

      fetch(`http://localhost:8080/saveBudget/${club.clubId}/${setItem.date}/0/${setItem.pay}/${setItem.detail}/${setItem.note}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url),
      }).then(data => console.log(data),
                alert('บันทึกสำเร็จ'),
                window.location.reload())
      .catch((error) => {
        console.log("Error"+ error);
        alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูลอีกครั้ง');
      })
    
    }else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }


  handleChangeImage(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.state.image = image;
    }
  }

  handleUpload = () => {
    
    const {image} = this.state;
    const uploadTask = storage.ref(`budget/${image.name}`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
         // error function ....
      console.log(error);
    }, 
    () => {
        // complete function ....
        storage.ref('budget').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
            alert('อัพโหลดรูปสำเร็จ')
        })
    });  
  }

  render() {
    
    const {club} = this.state;
    
    return <div>
        <AppNavbar/>
    
        <Container>
        
        <Form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <div className="row" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <FormGroup className="col-md-4 mb-3">
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
              <TextField  style={{ width: '250px',paddingTop: '2%' }}
                  label="รายรับ(บาท)"
                  margin="normal"     
                  variant="outlined"
                  onChange={this.handleChange}
                  name="income"
                  
              />
              <TextField  style={{ width: '250px',paddingTop: '2%'}}
                  label="รายจ่าย(บาท)"
                  margin="normal"     
                  variant="outlined"
                  onChange={this.handleChange}
                  name="pay"  
              />
              <TextField style={{ width: '250px',paddingTop: '2%'}}
                    label="รายละเอียด"
                    multiline
                    rows="5"
                    defaultValue=' '
                    value={this.state.setItem.detail}
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="detail"
                />

                <TextField style={{ width: '250px',paddingTop: '2%'}}
                    label="หมายเหตุ"
                    multiline
                    rows="5"
                    defaultValue=' '
                    value={this.state.setItem.note}
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="note"
                />

                <div style={{ width: '600px',paddingTop: '5%'}}>
                  <InputLabel htmlFor="tag-helper">อัพโหลดหลักฐาน</InputLabel>
                  <input type="file" onChange={this.handleChangeImage}/>
                  <Button style={{width: '100px',background: '#C4C1C1',color: '#000000'}} onClick={this.handleUpload}>upload</Button>
                </div>

                <div style={{ width: '250px',paddingTop: '5%',paddingBottom: '5%'}}>
                <progress value={this.state.progress} max="100"/>
                </div>

                <Button style={{width: '100px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}} onClick={this.save}>บันทึก</Button>
                <Button style={{width: '110px',background: '#000066',color: '#FFFFFF',justifyContent:'center',alignItems:'center'}} tag={Link} to={"/ShowDetail/"+this.props.match.params.clubId}>รายละเอียด</Button>
                
              
            </form>
          </FormGroup>
          </div>
          </Form>
        </Container> 
    </div>
    
  }
}
export default SaveBudget;
