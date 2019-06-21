import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import currentUser from './storeConfig/reducers';
import routes from './Routes';

const store = createStore(currentUser)

console.log(store.getState())

 ReactDOM.render(
    <Provider store={store}>
         {routes}
    </Provider>     
   ,
     document.getElementById('root')
 )

