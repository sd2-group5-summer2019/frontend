import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Homepage from './Homepage';
import LogIn from './LogIn';
import Survey from './Survey';
//import RouteHelper from './RouteHelper';

function Routes ({location}) {
return(
        <Switch location={location}>
             <Route path="/" exact component={Homepage}/>
             <Route path="/login" exact component={LogIn} />
            <Route path="/survey" exact component={Survey} />
        </Switch>
    )
}

export default Routes;