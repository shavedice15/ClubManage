import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FindClub from './components/ApplyToClub/FindClub';
import ClubInfo from './components/ApplyToClub/ClubInfo'
import RegisClub from './components/ApplyToClub/RegisClub';
import Member from './register/Member';
import Club from './register/Club';
class App extends Component {
  render() {
    return(
      <Router>Club
        <Switch>
          <Route path='/' exact={true} component={FindClub}/>
          <Route path='/FindClub' exact={true} component={FindClub}/>
          <Route path='/ClubInfo/:clubId' exact={true} component={ClubInfo}/>
          <Route path='/RegisClub/:clubId' exact={true} component={RegisClub}/>
          <Route path='/Members' exact={true} component={Member}/>
          <Route path='/Clubs' exact={true} component={Club}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
