import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import currentUser from './storeConfig/reducers';
import routes from './Routes';

// checks to see if there's data in local storage (browser)
// if there is it loads it to the store as initial state
// this makes it so that if you logged in and then refreshed the page
// you dont get logged out, later on as the store gets more complex
// we can add more to local storage but for now its just
// user_id,loggedIn boolean, token, and type
const initialState =  (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : {}

// creates the store
const store = createStore(currentUser, initialState)

console.log(store.getState())

store.subscribe(()=>{
     const state = JSON.stringify(store.getState())
     localStorage['redux-store'] = state
    
})

 ReactDOM.render(
          <Provider store={store}>
                {routes}
          </Provider>    
   ,
     document.getElementById('root')
 )

