import CreateTask from '../ui/CreateTask';
import {connect} from 'react-redux';
//import TasksPage from '../pages/TasksPage';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn
    }
}

const CreateTaskC = connect(mapStateToProps)(CreateTask)

//export const TasksPageC = connect(mapStateToProps)(TasksPage)


export default CreateTaskC;
