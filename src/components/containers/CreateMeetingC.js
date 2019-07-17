import CreateMeeting from '../ui/CreateMeeting';
import {connect} from 'react-redux';
import MeetingsPage from '../pages/MeetingsPage';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn
    }
}

const CreateMeetingC = connect(mapStateToProps)(CreateMeeting)

export const MeetingsPageC = connect(mapStateToProps)(MeetingsPage)


export default CreateMeetingC;
