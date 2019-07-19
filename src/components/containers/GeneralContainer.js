import {connect} from 'react-redux';
import Teams from '../pages/Teams';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn
    }
}

const TeamsContainer = connect(mapStateToProps)(Teams)

export default TeamsContainer;