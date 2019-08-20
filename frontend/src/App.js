import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FindClub from './components/ApplyToClub/FindClub';
import ClubInfo from './components/ApplyToClub/ClubInfo'
import RegisClub from './components/ApplyToClub/RegisClub';
import Member from './register/Member';
import Club from './register/Club';
import Login from './components/Login/Login';
import ShowDetail from './components/BudgetClub/ShowDetail';
import CheckBudget from './components/BudgetClub/CheckBudget';
import Manage from './components/ManageClub/Manage';
import MyClub from './components/ManageClub/MyClub';
import LoginOrganization from './components/Login/LoginOrganization';

class App extends Component {
  render() {
    return(
      <Router>Club
        <Switch>
          <Route path='/' exact={true} component={Login}/>
          <Route path='/FindClub' exact={true} component={FindClub}/>
          <Route path='/ClubInfo/:clubId' exact={true} component={ClubInfo}/>
          <Route path='/RegisClub/:clubId' exact={true} component={RegisClub}/>
          <Route path='/Members' exact={true} component={Member}/>
          <Route path='/Clubs' exact={true} component={Club}/>
          <Route path='/login' exact={true} component={Login}/>
          <Route path='/CheckBudget' exact={true} component={CheckBudget}/>
          <Route path='/ShowDetail/:clubId' exact={true} component={ShowDetail}/>
          <Route path='/manage/:clubId' exact={true} component={Manage}/>
          <Route path='/myClub' exact={true} component={MyClub}/>
          <Route path='/loginOrganization' exact={true} component={LoginOrganization}/>

        </Switch>
      </Router>
    )
  }
}

export default App;
