import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_REACTS,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT_REACTS
} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true, 
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action; 

    switch(type) {
        case GET_POSTS: 
            return {
                ...state, 
                posts: payload, 
                post: null,
                loading: false 
            }
        case GET_POST: 
            return {
                ...state, 
                posts: [],
                post: payload, 
                loading: false
            }
        case POST_ERROR: 
            return {
                ...state, 
                error: payload, 
                loading: false
            }
        case UPDATE_REACTS: 
            return {
                ...state,
                posts: state.posts
                    .map(post => post._id === payload.postId ? { 
                        ...post, likes: payload.likes } : post)
                    .map(post => post._id === payload.postId ? {
                        ...post, loves: payload.loves
                    } : post)
                    .map(post => post._id === payload.postId ? {
                        ...post, laughs: payload.laughs
                    } : post),
                loading: false
            }
        case UPDATE_COMMENT_REACTS:
            const newComment = state.post.comments.find(comment => comment._id.toString() === payload.commentId);
            newComment.likes = payload.likes; 
            newComment.loves = payload.loves; 
            newComment.laughs = payload.laughs; 
            return {
                ...state, 
                post: {...state.post, comments: state.post.comments.map(comment => comment._id.toString() === payload.commentId ? newComment : comment)},
                loading: false
            }
        case DELETE_POST:
            return {
                ...state, 
                posts: state.posts.filter(post => post._id !== payload.postId),
                loading: false
            }
        case ADD_POST: 
            return {
                ...state, 
                posts: [payload, ...state.posts],
                loading: false
            }
        case ADD_COMMENT: 
            return {
                ...state, 
                post: {
                    ...state.post, 
                    comments: payload 
                }, 
                loading: false
            }
        case REMOVE_COMMENT: 
            return {
                ...state, 
                post: {
                    ...state.post, 
                    comments: payload
                },
                loading: false
            }
        default: 
            return state; 
    }
}