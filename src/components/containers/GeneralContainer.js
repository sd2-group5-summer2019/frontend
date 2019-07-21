import {connect} from 'react-redux';
import Teams from '../pages/Teams';
import CreateInstance from '../ui/CreateInstance';
import Survey from '../ui/Survey';

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

export default TeamsContainer;