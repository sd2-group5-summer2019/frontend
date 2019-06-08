import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from './Homepage';
import LogIn from './LogIn';
import Survey from './Survey';
import Register from './Register';


function Routes () {
return(
        <Switch>
             <Route path="/" exact component={Homepage}/>
             <Route path="/login" exact component={LogIn} />
            <Route path="/survey" exact component={Survey} />
            
            <Route path="/register" exact component={Register} />
        </Switch>
    )
}

export default Routes;