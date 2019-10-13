import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
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
      <AppNavbar/>
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