import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from './Homepage';
import LogIn from './LogIn';
import Survey from './Survey';
import Register from './Register';
import Assignments from './Assignments';
import Courses from './Courses';
import Groups from './Groups';
import Students from './Students';

function Routes () {
return(
        <Switch>
             <Route path="/" exact component={Homepage}/>
             <Route path="/login" exact component={LogIn} />
            <Route path="/survey" exact component={Survey} />
            <Route path="/register" exact component={Register} />
            <Route path="/assignments" exact component={Assignments} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/groups" exact component={Groups} />
            <Route path="/students" exact component={Students} />
        </Switch>
    )
}

export default Routes;