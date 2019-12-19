import React, {Fragment, useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {getProfileById} from "../../../actions/profile";
import {connect} from "react-redux";
import Spinner from "../../layout/Spinner/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "../ProfileTop/ProfileTop";
import ProfileAbout from "../ProfileAbout/ProfileAbout";

const Profile = ({match, getProfileById, profile: {profile, loading}, auth}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <div className="w-80 mt3">
            { profile === null || loading ? <Spinner/> : <Fragment>
                <Link to="/users" className="btn btn-light">Back to Profiles</Link>
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

export default connect(mapStateToProps, {getProfileById})(Profile); 
