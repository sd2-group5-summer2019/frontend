import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeContainer from './components/containers/HomeContainer';
import CreateAssignmentC from './components/containers/CreateAssignmentC';
import LoginContainer from './components/containers/LoginContainer';
import Survey from './components/ui/Survey';
import Register from './components/ui/Register';
import {AssignmentsPageC} from './components/containers/CreateAssignmentC';
import Create_Team from './components/ui/Create_Team';
import Create_Student from './components/ui/Create_Student';
import Create_Sponsor from './components/ui/Create_Sponsor';
import Sponsors from './components/pages/Sponsors';
import Get_Results from './components/ui/Get_Results';
import {MeetingsPageC} from './components/containers/CreateMeetingC';
import CreateMeetingC from './components/containers/CreateMeetingC';
import TeamsContainer, { StudentsContainer } from './components/containers/GeneralContainer';
import CreateTaskC from './components/containers/CreateTaskC';
import {ProjectManagementPageC} from './components/containers/CreateTaskC';
import {StudentDashContainer} from './components/containers/GeneralContainer';
import ActivateAccount from './components/ui/ActivateAccount';

const routes = (
    <Router>
        <Switch>
            <Route path="/" exact component={HomeContainer}/>
            <Route path="/student_dashboard" exact component={StudentDashContainer}/> 
            <Route path="/login" exact component={LoginContainer} />
            <Route path="/survey" exact component={Survey} />
            <Route path="/register" exact component={Register} />
            <Route path="/assignments" exact component={AssignmentsPageC} />
            <Route path="/create_assignment" exact component={CreateAssignmentC} />
            <Route path="/teams" exact component={TeamsContainer} />
            <Route path="/sponsors" exact component={Sponsors} />
            <Route path="/students" exact component={StudentsContainer} />
            <Route path="/create_student" exact component={Create_Student} />
            <Route path="/create_sponsor" exact component={Create_Sponsor} />
            <Route path="/create_team" exact component={Create_Team} />
            <Route path="/get_results" exact component={Get_Results} />
            <Route path="/create_assignment" exact component={CreateAssignmentC} />
            <Route path="/meetings" exact component={MeetingsPageC} />
            <Route path="/create_meeting" exact component={CreateMeetingC} />
            <Route path="/create_task" exact component={CreateTaskC}/>
            <Route path="/activate_account" exact component={ActivateAccount}/>
            <Route path="/project_management_page" exact component={ProjectManagementPageC}/>
        </Switch>
    </Router>
)


export default routes;