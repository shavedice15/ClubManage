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
import Show from './register/Show';
import MemberEdit from './register/MemberEdit';
import Showclub from './register/Showclub';
import ClubMember from './components/ManageClub/ClubMember';
import EditClubInfo from './components/ManageClub/EditClubInfo';
import AcceptMember from './components/ManageClub/AcceptMember';
import ClubEdit from './register/ClubEdit';
import ShareBudget from './components/BudgetClub/ShareBudget';
import SaveBudget from './components/BudgetClub/SaveBudget';
import ActivityPost from './components/Activity/ActivityPost';
import ShowActivity from './components/Activity/ShowActivity';
import DetailActivity from './components/Activity/DetailActivity';
import ProfileMember from './components/ProfileMember/ProfileMember';
import EditProfileMember from './components/ProfileMember/EditProfileMember';
import ProfileOrganize from './components/ProfileOrganize/ProfileOrganize';
import EditProfileOrganize from './components/ProfileOrganize/EditProfileOrganize';
import TableOrgani from './components/ProfileOrganize/TableOrgani';
import OrganizeInput from './components/ProfileOrganize/OrganizeInput';
import MakeClub from './components/ManageClub/MakeClub';
class App extends Component {
  render() {
    return(
      <Router>
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
          <Route path='/shows' exact={true} component={Show}/>
          <Route path='/members/:id' exact={true} component={MemberEdit}/>
          <Route path='/showsclub' exact={true} component={Showclub}/>
          <Route path='/clubMember/:clubId' exact={true} component={ClubMember}/>
          <Route path='/editClub/:clubId' exact={true} component={EditClubInfo}/>
          <Route path='/acceptMember/:clubId' exact={true} component={AcceptMember}/>
          <Route path='/clubs/:id' exact={true} component={ClubEdit}/>
          <Route path='/ShareBudget' exact={true} component={ShareBudget}/>
          <Route path='/SaveBudget/:clubId' exact={true} component={SaveBudget}/>
          <Route path='/ActivityPost/:clubId' exact={true} component={ActivityPost}/>
          <Route path='/ShowActivity' exact={true} component={ShowActivity}/>
          <Route path='/DetailActivity/:activityId' exact={true} component={DetailActivity}/>
          <Route path='/ProfileMember' exact={true} component={ProfileMember}/>
          <Route path='/EditProfileMember' exact={true} component={EditProfileMember}/>
          <Route path='/ProfileOrganize' exact={true} component={ProfileOrganize}/>
          <Route path='/EditProfileOrganize' exact={true} component={EditProfileOrganize}/>
          <Route path='/TableOrgani' exact={true} component={TableOrgani}/>
          <Route path='/OrganizeInput' exact={true} component={OrganizeInput}/>
          <Route path='/MakeClub' exact={true} component={MakeClub}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
