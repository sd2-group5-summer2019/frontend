import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from '../pages/Homepage';
import LogIn from './LogIn';
import Survey from './Survey';
import Register from './Register';
import AssignmentsPage from '../pages/AssignmentsPage';
import Courses from '../pages/Courses';
import Groups from '../pages/Groups';
import Students from '../pages/Students';

function Routes () {
return(
        <Switch>
             <Route path="/" exact component={Homepage}/>
             <Route path="/login" exact component={LogIn} />
            <Route path="/survey" exact component={Survey} />
            <Route path="/register" exact component={Register} />
            <Route path="/assignments" exact component={AssignmentsPage} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/groups" exact component={Groups} />
            <Route path="/students" exact component={Students} />
        </Switch>
    )
}

export default Routes;