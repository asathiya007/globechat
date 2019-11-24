import axios from "axios";
import {
    GET_PROFILE, 
    PROFILE_ERROR
} from "./types";

// get current user's profile 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/users");
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