import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginContainer from './components/containers/LoginContainer';
import Survey from './components/ui/Survey';
import Register from './components/ui/Register';
import AssignmentsPage from './components/pages/AssignmentsPage';
import Courses from './components/pages/Courses';
import Groups from './components/pages/Groups';
import Students from './components/pages/Students';
import HomeContainer from './components/containers/HomeContainer';

const routes = (
        <Router>
            <Switch>
            <Route path="/" exact component={HomeContainer}/>
            <Route path="/login" exact component={LoginContainer} />
            <Route path="/survey" exact component={Survey} />
            <Route path="/register" exact component={Register} />
            <Route path="/assignments" exact component={AssignmentsPage} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/groups" exact component={Groups} />
            <Route path="/students" exact component={Students} />
            </Switch>
        </Router>
    )


export default routes;