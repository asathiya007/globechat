import {
    GET_PROFILE, 
    PROFILE_ERROR, 
    CLEAR_PROFILE,
    GET_USERS
} from "../actions/types";

const initialState = {
    profile: null,
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
                profile: payload,
                loading: false 
            }
        case PROFILE_ERROR: 
            return {
                ...state, 
                error: payload, 
                loading: false 
            }
        case CLEAR_PROFILE: 
            return {
                ...state, 
                profile: null, 
                allUsers: [],
                loading: false, 
                error: {}
            }
        case GET_USERS:
            return {
                ...state, 
                allUsers: payload.profiles,
                loading: false, 
                profile: null
            }
        default: 
            return state; 
    }
}