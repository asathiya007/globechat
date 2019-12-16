import axios from "axios";
import {
    GET_PROFILE, 
    PROFILE_ERROR,
    GET_USERS,
    CLEAR_PROFILE
} from "./types";
import {produceAlert} from "../actions/alert";

// get current user's profile 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        }); 
    }
}

// get all users' profiles 
export const getAllUsers = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get("api/profile/all");
        dispatch({
            type: GET_USERS,
            payload: res.data
        }); 
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        }); 
    }
}; 

// create or update current user's profile 
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }); 

        dispatch(produceAlert(edit ? "profile updated" : "profile created", "success"));

        history.push("/dashboard");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(produceAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// get profile by id 
export const getProfileById = userid => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userid}`);
        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        }); 
    }
}

