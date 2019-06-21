import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from './Homepage';
import LogIn from './LogIn';
import Survey from './Survey';
import Register from './Register';
import Create_Course from './Create_Course';
import Courses from './Courses';
import Create_Team from './Create_Team';
import Create_Student from './Create_Student';
import Create_Sponsor from './Create_Sponsor';
import Teams from './Teams';
import Students from './Students';
import Sponsors from './Sponsors';

function Routes () {
return(
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/login" exact component={LogIn} />
            <Route path="/survey" exact component={Survey} />
            <Route path="/register" exact component={Register} />
            <Route path="/teams" exact component={Teams} />
            <Route path="/sponsors" exact componenent={Sponsors}/>
            <Route path="/students" exact component={Students} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/create_course" exact component={Create_Course} />
            <Route path="/create_student" exact component={Create_Student} />
            <Route path="/create_sponsor" exact component={Create_Sponsor} />
            <Route path="/create_team" exact component={Create_Team} />
        </Switch>
    )
}

export default Routes;