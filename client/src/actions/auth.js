import axios from "axios";
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT
} from "./types";
import {produceAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.token);

    try {
        if (localStorage.token) {
            const res = await axios.get("api/users"); 
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } 
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        }); 
    }
}

export const registerUser = ({name, email, password}) => async dispatch => {
    // for axios HTTP request 
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    } 
    const body = JSON.stringify({name, email, password}); 

    try {
        // register user and obtain token string 
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }); 

        // load user data 
        dispatch(loadUser());
    } catch (err) {
        // create an alert for each error message, if unsuccessful 
        const errors = err.response.data.errors; 
        if (errors) {
            errors.forEach(err => dispatch(produceAlert(err.msg, "danger"))); 
        }

        // indicate registration failed 
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const loginUser = ({ email, password }) => async dispatch => {
    // for axios HTTP request 
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ email, password });

    try {
        // register user and obtain token string 
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        // load user data 
        dispatch(loadUser());
    } catch (err) {
        // create an alert for each error message, if unsuccessful 
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(produceAlert(err.msg, "danger")));
        }

        // indicate login failed 
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT
    }); 
}