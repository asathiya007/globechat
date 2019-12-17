import axios from "axios";
import {produceAlert} from "./alert";
import {
    GET_POSTS,
    POST_ERROR
} from "./types";

// get all posts 
export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get("/api/posts"); 

        dispatch({
            type: GET_POSTS,
            payload: res.data
        }); 
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}