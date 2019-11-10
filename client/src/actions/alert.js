import {SET_ALERT, REMOVE_ALERT} from "./types";
import uuid from "uuid";

export const produceAlert = (msg, alertType, timeout = 3000) => dispatch => {
    // make alert
    const id = uuid.v4(); 
    dispatch({
        type: SET_ALERT, 
        payload: {msg, alertType, id}
    }); 

    // destroy alert
    setTimeout(() => dispatch({
        type: REMOVE_ALERT, 
        payload: id
    }), timeout);
}