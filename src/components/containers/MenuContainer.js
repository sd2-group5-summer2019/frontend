import Menu from '../ui/Menu';
import {connect} from 'react-redux';
import {onLogout} from '..//../storeConfig/actions';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        type:state.type,
        token: state.token,
        loggedIn:state.loggedIn
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