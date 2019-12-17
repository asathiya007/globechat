import axios from "axios";
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    PROFILE_ERROR
} from "./types";
import {produceAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.token);

    try {
        if (localStorage.token) {
            const res = await axios.get("/api/users"); 
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } 
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        }); 

        dispatch({
            type: CLEAR_PROFILE
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

    dispatch({
        type: CLEAR_PROFILE
    }); 
}

// delete account 
export const deleteAccount = () => async dispatch => {
    if (window.confirm("Are you sure? This action cannot be undone")) {
        try {
            await axios.delete("/api/users");

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(produceAlert("Account permanently deleted")); 
        } catch(err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            }); 
        }
    }
}