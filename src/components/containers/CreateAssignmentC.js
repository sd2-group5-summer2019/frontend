import CreateAssignment from '../ui/CreateAssignment';
import {connect} from 'react-redux';
import AssignmentsPage from '../pages/AssignmentsPage';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn
    }
}

const CreateAssignmentC = connect(mapStateToProps)(CreateAssignment)

export const AssignmentsPageC = connect(mapStateToProps)(AssignmentsPage)


export default CreateAssignmentC;
