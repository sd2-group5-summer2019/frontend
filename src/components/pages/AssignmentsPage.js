import React from 'react';
import CreateAssignment from '../ui/CreateAssignment';
import MenuContainer from '../containers/MenuContainer';
import "../../index.css";

class Assignments extends React.Component{

    
   
    render(){
        return(
            <div>
                <h1 className="header">Assignments</h1>
                <MenuContainer />
                <CreateAssignment/>
            </div>
            
        )
    }
}
export default Assignments;