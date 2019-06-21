import { ON_LOGIN,
         ON_LOGOUT,
         GET_TOKEN
         } from "./actions";

// initial state

const initialState = {
    user_id:'',
    token:'',
    loggedIn:false
}

function currentUser(state = initialState, action){
    
    switch (action.type){
        case ON_LOGIN:
           return Object.assign({}, state, {
               token: action.payload,
               loggedIn:true
           })
        case ON_LOGOUT:
            return Object.assign({}, state, {
            token:'',
            loggedIn:false
        })
        case GET_TOKEN:
            return state.token
        default:
            return state
    }
    
}

export default currentUser;