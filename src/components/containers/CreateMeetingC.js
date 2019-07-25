import CreateMeeting from '../ui/CreateMeeting';
import {connect} from 'react-redux';
import MeetingsPage from '../pages/MeetingsPage';
import Meeting from '../ui/Meeting';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn,
        ip_address:state.ip_address
    }
}

const CreateMeetingC = connect(mapStateToProps)(CreateMeeting)

export const MeetingsPageC = connect(mapStateToProps)(MeetingsPage)

export const MeetingC = connect(mapStateToProps)(Meeting)


export default CreateMeetingC;
