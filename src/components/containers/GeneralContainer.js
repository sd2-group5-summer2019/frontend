import {connect} from 'react-redux';
import Teams from '../pages/Teams';
import CreateInstance from '../ui/CreateInstance';
import Survey from '../ui/Survey';
import Students from '../pages/Students';
import Student from '../ui/Student'
import {Dash} from '../pages/Homepage';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn
    }
}


const TeamsContainer = connect(mapStateToProps)(Teams)

export const AssignContainer = connect(mapStateToProps)(CreateInstance)

export const TakeAssignmentContainer = connect(mapStateToProps)(Survey)

export const StudentsContainer = connect(mapStateToProps)(Students)

export const StudentC = connect(mapStateToProps)(Student)
// Dash container
export const DashContainer = connect(mapStateToProps)(Dash)


export default TeamsContainer;