import {connect} from 'react-redux';
import Homepage from '../pages/Homepage';

const mapStateToProps = (state) => {
    return {
        user_id: state.user_id,
        token: state.token,
        loggedIn:state.loggedIn,
        userType:state.userType
    }
}


// wrapper container for Homepage
// basically maps the state from redux store to the
// props we're using in Homepage, mainly whether the
// user is logged in or not...
// I'll probably add more files to this later on

const HomeContainer = connect(mapStateToProps)(Homepage)

export default HomeContainer;

