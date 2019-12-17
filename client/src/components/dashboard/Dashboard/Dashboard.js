import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {getCurrentProfile} from "../../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner/Spinner"; 
import "./Dashboard.css";
import {Link} from "react-router-dom";
import {deleteAccount} from "../../../actions/auth";

export const Dashboard = ({getCurrentProfile, auth: {user}, profile: {loading, profile}, deleteAccount}) => {
    useEffect(() => {
        getCurrentProfile(); 
    }, [getCurrentProfile]); 

    if (loading && profile === null) {
        return <Spinner />
    }

    return (
        <div className="top-space w-50">
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
                        <p className="f3">Edit your profile</p>
                        <Link to="/edit-profile" className="btn btn-primary my-1">
                            Edit Profile
                        </Link>
                    </div>
                    <div className="tc background-dark br4 ph3 pb2 pt2 mt3">
                        <p className="f3">Start chatting!</p>
                        <Link to="/posts" className="btn btn-primary my-1">
                            Enter GlobeChat
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <div className="tc background-dark br4 ph3 pb2 pt2 mt3">
                    <p className="f3">Create Your Profile</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </div>
            )}
            <div className="tc background-dark br4 ph3 pb2 pt2 mt3">
                <p className="f3">Delete Your Account</p>
                <button className="btn btn-danger my-1" onClick={deleteAccount}>
                    <i className="fas fa-user-minus"></i> Delete Account
                </button>
            </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth, 
    profile: state.profile
}); 

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard); 