// action types
export const ON_LOGIN = 'ON_LOGIN'
export const ON_LOGOUT = 'ON_LOGOUT'
export const GET_TOKEN = 'GET_TOKEN'

// action creators

export function onLogin(payload){
    return{type: ON_LOGIN, payload}
}

export function onLogout(payload){
    return{type: ON_LOGOUT}
}

export function getToken(){
    return{type:GET_TOKEN}
}