import {connect} from 'react-redux';
import Teams from '../pages/Teams';
import CreateInstance from '../ui/CreateInstance';

import Survey from '../ui/Survey';
import Students from '../pages/Students';
import Student from '../ui/Student';
import InstructorDashboard from '../ui/InstructorDashboard';
import StudentDashboard from '../ui/StudentDashboard';
import Get_Results from '../ui/Get_Results'

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn,
        ip_address:state.ip_address
    }
}


const TeamsContainer = connect(mapStateToProps)(Teams)

export const AssignContainer = connect(mapStateToProps)(CreateInstance)

export const TakeAssignmentContainer = connect(mapStateToProps)(Survey)

export const StudentsContainer = connect(mapStateToProps)(Students)

export const StudentC = connect(mapStateToProps)(Student)
// Dash container
// Instructor Dashboard container
export const InstructorDashContainer = connect(mapStateToProps)(InstructorDashboard)
// Student Dashboard container
export const StudentDashContainer = connect(mapStateToProps)(StudentDashboard)

export const Get_ResultsContainer = connect(mapStateToProps)(Get_Results)
export default TeamsContainer;