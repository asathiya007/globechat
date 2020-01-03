import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import "./EditProfile.css";
import {connect} from "react-redux";
import {createProfile, getCurrentProfile} from "../../../actions/profile";
import {Link, withRouter} from "react-router-dom";

const EditProfile = ({createProfile, getCurrentProfile, history, profile: {profile, loading}}) => {
    const [formData, setFormData] = useState({
        location: "",
        phone: "",
        email: profile.email,
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    });

    const [displaySocialInfo, toggleSocialDisplay] = useState(false);
    
    const {
        location,
        phone,
        email,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData; 

    const [fetchedProfStart, setFetchedProfStart] = useState(false);

    useEffect(() => {
        if (!fetchedProfStart) {
            getCurrentProfile(); 
            setFetchedProfStart(true);
        }

        setFormData({
            location: loading || !profile.location ? "" : profile.location,
            phone: loading || !profile.phone ? "" : profile.phone, 
            email: loading || !profile.email ? "" : profile.email,
            bio: loading || !profile.bio ? "" : profile.bio,
            twitter: loading || !profile.social ? "" : profile.social.twitter,
            facebook: loading || !profile.social ? "" : profile.social.facebook,
            linkedin: loading || !profile.social ? "" : profile.social.linkedin,
            youtube: loading || !profile.social ? "" : profile.social.youtube,
            instagram: loading || !profile.social ? "" : profile.social.instagram
        });
    }, [loading, profile, getCurrentProfile, fetchedProfStart]); 

    const fitPhoneNum = phoneNum => {
        let newPhoneNum = "";
        for (let i = 0; i < phoneNum.length; i++) {
            const code = phoneNum.charCodeAt(i);
            if (code <= 57 && code >= 48) {
                newPhoneNum += phoneNum.charAt(i);
            }
        }
        return newPhoneNum;
    }

    const onChange = e => {
        if (e.target.name === "phone") {
            e.target.value = fitPhoneNum(e.target.value);
        }
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault(); 
        createProfile(formData, history, true);
    }

    return (
        <div>
            <h1 className='large white-text'>Edit Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user white-hover' /> Let's edit some information to update your profile
			</p>
            <div className="background-dark br4 p-2 pt1">
                <form className="form" style={{ width: "40vw" }} onSubmit={onSubmit}>
                    <div className="form-group">
                        <p className="f4">Location</p>
                        <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                        <small className="form-text">
                            City & state suggested (eg. Boston, MA)
                    </small>
                    </div>
                    <div className="form-group">
                        <p className="f4">Phone Number</p>
                        <input type="text" placeholder="Phone Number" name="phone" value={phone} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <p className="f4">Email address</p>
                        <input type="text" name="email" value={email} readOnly />
                    </div>
                    <div className="form-group">
                        <p className="f4">Bio</p>
                        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>
                    <div className="my-2">
                        <button type="button" className="btn btn-light" onClick={() => toggleSocialDisplay(!displaySocialInfo)}>
                            Add Social Network Links
                    </button>
                        <span>Optional</span>
                    </div>

                    {displaySocialInfo &&
                        <Fragment>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
                            </div>
                        </Fragment>
                    }

                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form> 
            </div>
        </div>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
}); 

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile)); 
