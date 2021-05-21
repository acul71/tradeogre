import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import {tradeOgreInit, checkPasswordFile} from './lib/utils'

//tradeOgreInit()
//const firstTime = checkPasswordFile() ? false : true
const firstTime = false


ReactDOM.render(
  <React.StrictMode>
    <App firstTime={firstTime}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
