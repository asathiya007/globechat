import {
    GET_PROFILE, 
    PROFILE_ERROR, 
    LOGOUT 
} from "../actions/types";

const initialState = {
    user: null,
    allUsers: [],
    loading: true, 
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action; 

    switch (type) {
        case GET_PROFILE: 
            return {
                ...state, 
                user: payload,
                loading: false 
            }
        case PROFILE_ERROR: 
            return {
                ...state, 
                error: payload, 
                loading: false 
            }
        case LOGOUT: 
            return {
                user: null, 
                allUsers: [],
                loading: false, 
                error: {}
            }
        default: 
            return state; 
    }
}