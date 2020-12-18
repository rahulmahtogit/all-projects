import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Setting baseURL
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

// For comman request
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'

// For post request
axios.defaults.headers.post['Content-Type'] = 'application/json'


axios.interceptors.request.use(request =>{
    console.log(request)
    // Edit request config
    return request;
}, error =>{
    console.log(error)
    return Promise.reject(error)
});

axios.interceptors.response.use(response =>{
    console.log(response)
    // Edit response config
    return response; 
}, error =>{
    console.log(error)
    return Promise.reject(error)
})


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
