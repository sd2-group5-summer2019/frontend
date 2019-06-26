import LogIn from '../ui/LogIn';
import {onLogin} from '..//../storeConfig/actions';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        token: state.token,
        loggedIn:state.loggedIn,
        type:state.type
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin(payload){
            dispatch(
                onLogin(payload)
            )
        }
    }
}

const LoginContainer =  connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default LoginContainer;