import React, {Fragment, useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {getProfileById} from "../../../actions/profile";
import {connect} from "react-redux";
import Spinner from "../../layout/Spinner/Spinner";
import {Link, withRouter} from "react-router-dom";
import ProfileTop from "../ProfileTop/ProfileTop";
import ProfileAbout from "../ProfileAbout/ProfileAbout";

const Profile = ({match, getProfileById, profile: {profile, loading}, auth, history}) => {
    useEffect(() => {
        if (match.params.id) {
            getProfileById(match.params.id);
        }
    }, [getProfileById, match.params.id]);

    if (!loading && profile === null) {
        return (
            <div className="top-space tc background-dark br4 w-80 pa2">
                <h1 className="white-text ">This user has not yet created their profile, come check back in later!
                </h1>
                <button className="btn btn-light mb3" onClick={e => {
                    e.preventDefault();
                    history.goBack();
                }}>Go Back</button>
            </div>
        )
    }

    return (
        <div className="w-80 mt3">
            { profile === null || loading ? <Spinner/> : <Fragment>
                <button className="btn btn-light" onClick={e => {
                    e.preventDefault(); 
                    history.goBack(); 
                }}>Go Back</button>
                {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (
                    <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
                )}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                </div>
            </Fragment>
            }
        </div>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
}); 

export default connect(mapStateToProps, {getProfileById})(withRouter(Profile)); 
