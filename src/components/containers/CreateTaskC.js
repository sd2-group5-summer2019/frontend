import CreateTask from '../ui/CreateTask';
import {connect} from 'react-redux';
import ProjectManagementPage from '../pages/ProjectManagementPage';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn,
        ip_address:state.ip_address
    }
}

const CreateTaskC = connect(mapStateToProps)(CreateTask)

export const ProjectManagementPageC = connect(mapStateToProps)(ProjectManagementPage)


export default CreateTaskC;
