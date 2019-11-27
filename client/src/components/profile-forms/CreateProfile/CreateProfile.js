import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import "./CreateProfile.css";

const CreateProfile = props => {
    return (
        <Fragment>
            <form className="form" style={{width: "40vw"}}>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Phone Number" name="phone" />
                    <small className="form-text">
                        Phone Number
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" />
                    <small className="form-text">
                        Email
                    </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio"></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>
                <div className="my-2">
                    <button type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form> 
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default CreateProfile
