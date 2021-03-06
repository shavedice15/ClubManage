import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import {auth} from '../../firebase';

class PostNews extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null,
                  news: [],
                  setItem: this.emptyItem};
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

    fetch('http://localhost:8080/allNews')
      .then(response => response.json())
      .then(data => this.setState({news: data}));
  }

  async remove(newsId) {
    await fetch(`http://localhost:8080/deleteNews/${newsId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch((error) => {
      console.log("Error"+ error);
    });

    fetch('http://localhost:8080/allNews')
      .then(response => response.json())
      .then(data => this.setState({news: data}));
  }

  render(){
    const {news} = this.state;
    const NewsList = news.map(news => {
      return (
          <ExpansionPanel style={{width: '100%'}}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography style={{width: '55%'}}>{news.title}</Typography>
              <Typography style={{width: '40%',color: '#9B9B9B',}}>{news.date}</Typography>
              <Typography style={{width: '5%'}}>
                <Button style={{width: '100%',background: '#FFB6C1',color: '#000000',justifyContent:'center',alignItems:'center'}}
                  onClick={() => this.remove(news.id)}>
                  ลบ
                </Button>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography style={{color: '#001261',}}>
                {news.detail}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
      )
    });

    return (<div>
      <AppNavBarOrganization/>
      <Container>
        <form>
          {NewsList}
        </form>
      </Container>
    </div>
    );
  }
  
}
export default PostNews;