import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Apply from './components/ApplyToClub/Apply';
import FindClub from './components/ApplyToClub/FindClub';
import ClubInfo from './components/ApplyToClub/ClubInfo'
class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path='/' exact={true} component={FindClub}/>
          <Route path='/apply' exact={true} component={Apply}/>
          <Route path='/FindClub' exact={true} component={FindClub}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
