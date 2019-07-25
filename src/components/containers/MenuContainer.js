import Menu from '../ui/Menu';
import {connect} from 'react-redux';
import {onLogout} from '..//../storeConfig/actions';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        userType:state.userType,
        token: state.token,
        loggedIn:state.loggedIn,
        ip_address:state.ip_address
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onLogout(){
            dispatch(
                onLogout()
            )
        }
    }
}


const MenuContainer =  connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;