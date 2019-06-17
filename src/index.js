import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import currentUser from './reducers';
import {
    onLogin,
    onLogout,
    getToken
} from './actions';

const store = createStore(currentUser)
console.log(store.getState())

 ReactDOM.render(
    <Provider store={store}>
         <App />
    </Provider>     
   ,
     document.getElementById('root')
 )

