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
import Teams from './components/pages/Teams';
import Students from './components/pages/Students';
import Sponsors from './components/pages/Sponsors';
import Get_Results from './components/ui/Get_Results';

const routes = (
    <Router>
        <Switch>
            <Route path="/" exact component={HomeContainer}/>
            <Route path="/login" exact component={LoginContainer} />
            <Route path="/survey" exact component={Survey} />
            <Route path="/register" exact component={Register} />
            <Route path="/assignments" exact component={AssignmentsPageC} />

            <Route path="/teams" exact component={Teams} />
            <Route path="/sponsors" exact component={Sponsors} />
            <Route path="/students" exact component={Students} />
            <Route path="/create_student" exact component={Create_Student} />
            <Route path="/create_sponsor" exact component={Create_Sponsor} />
            <Route path="/create_team" exact component={Create_Team} />
            <Route path="/get_results" exact component={Get_Results} />
            
            <Route path="/create_assignment" exact component={CreateAssignmentC} />
        </Switch>
    </Router>
)


export default routes;