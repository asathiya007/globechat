import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner/Spinner"; 
import "./Dashboard.css";
import {Link} from "react-router-dom";

export const Dashboard = ({getCurrentProfile, auth: {user}, profile: {loading, profile}}) => {
    useEffect(() => {
        getCurrentProfile(); 
    }, [getCurrentProfile]); 

    if (loading && profile === null) {
        return <Spinner />
    }

    return (
        <div className="top-space">
            <div className="tc background-dark br4 ph3 pv2">
                <h1 className="large white-text">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>{" "}
                    Welcome {user && user.name}
                </p>
            </div>
            <div>
                {profile !== null ? (
                <Fragment>
                    <div className="tc background-dark br4 ph3 pb2 pt2 mt3">
                        <p>Edit your profile</p>
                        <Link to="/edit-profile" className="btn btn-primary my-1">
                            Edit Profile
                        </Link>
                    </div>
                    <div className="tc background-dark br4 ph3 pb2 pt2 mt3">
                        <p>Start chatting!</p>
                        <Link to="/globechat" className="btn btn-primary my-1">
                            Enter GlobeChat
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <div className="tc background-dark br4 ph3 pb2 pt2 mt3">
                    <p>You have not yet created a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </div>
            )}
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth, 
    profile: state.profile
}); 

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard); 