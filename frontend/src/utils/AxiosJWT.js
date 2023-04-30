import axios from 'axios'

const baseURL = 'http://pawspets.onrender.com/';

var loginToken = localStorage.getItem('jwtToken');
console.log("Token: "+loginToken);

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Authorization': loginToken ? (loginToken ?  "Bearer " + loginToken: null) : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance;