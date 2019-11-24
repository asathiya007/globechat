import React from 'react';
import "./Landing.css";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

const Landing = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="greeting">
            <div>
                <h1 className="message br4 ph3 pv2">Register or Log In to Start Chatting!</h1>
            </div>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(mapStateToProps)(Landing); 
