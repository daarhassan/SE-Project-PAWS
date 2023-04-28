import axios from 'axios'

const baseURL = 'https://pawspets.onrender.com/';

var loginToken = localStorage.getItem('jwtToken');
console.log("Token: "+loginToken);

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': loginToken ? (loginToken ?  "Bearer " + loginToken: null) : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance;