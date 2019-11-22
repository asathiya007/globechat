import axios from "axios";
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from "./types";
import {produceAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.token);

    try {
        if (localStorage.token) {
            const res = await axios.get("http://localhost:5000/api/users"); 
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