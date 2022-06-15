import axios from "axios";
import { service as authService } from './AuthService/authService'
import { JWT_REFRESH_URL, JWT_VERIFY_URL, JWT_CREATE_URL} from './AuthService/authService'
const adapter = require('axios/lib/adapters/http')

// Set default configs
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.adapter = adapter

// Axios Request Interceptor Settings
axios.interceptors.request.use(
    config => {
        // Set Authorization Header if Logged In
        if (authService.is_logged_in()){
            config.headers['Authorization'] = 'Bearer ' + authService.get_current_user().jwt_access;
        }

        // Set Base Url
        if (process.env.hasOwnProperty('REACT_APP_API_PORT'))
        {
            config.baseURL = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
        } else
        {
            config.baseURL = process.env.REACT_APP_API_URL
        }

        return config;
    },
    error => {
        return Promise.reject(error)
    });

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;

    // Prevent recursion
    if (!authService.is_logged_in() || originalRequest.url === JWT_VERIFY_URL
        || originalRequest.url === JWT_REFRESH_URL
        || originalRequest.url === JWT_CREATE_URL) {
        return Promise.reject(error);
    }


    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        return authService.refresh().then(() => {
                return axios(originalRequest);
            },
            (error) => Promise.reject(error)
        );
    }

    return Promise.reject(error);
});