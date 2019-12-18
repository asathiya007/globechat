import axios from "axios";
import {produceAlert} from "./alert";
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_REACTS,
    DELETE_POST,
    ADD_POST
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

// like post 
export const likePost = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`); 

        dispatch({
            type: UPDATE_REACTS, 
            payload: {
                postId, 
                likes: res.data.likes, 
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        }); 
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        }); 
    }
}

// love post 
export const lovePost = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/love/${postId}`);

        dispatch({
            type: UPDATE_REACTS,
            payload: {
                postId,
                likes: res.data.likes,
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// laugh post 
export const laughPost = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/laugh/${postId}`);

        dispatch({
            type: UPDATE_REACTS,
            payload: {
                postId,
                likes: res.data.likes,
                loves: res.data.loves,
                laughs: res.data.laughs
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// delete post 
export const deletePost = (postId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: {postId}
        }); 
        dispatch(produceAlert("deleted post", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// add post 
export const addPost = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post("/api/posts", formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(produceAlert("added post", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}