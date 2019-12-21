import React from 'react'; 
import PropTypes from 'prop-types'; 
import "./ProfileTop.css";
import Moment from "react-moment";

const ProfileTop = ({profile: {
    location,
    phone,
    email,
    social,
    date,
    user: {
        name, avatar
    }
}}) => {
    return (
        <div className="profile-top background-dark br4 p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt="profile pic"
            />
            <h1 className="large text-primary">{name}</h1>
            <p className="lead text-primary">{location}</p>
            <p>
                Joined on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <div>
                <p>
                    <i className="fas fa-envelope white-hover"></i> {email}
                </p>
                <p>
                    <i className="fas fa-phone white-hover"></i> {phone}
                </p>
            </div>
            <div className="icons my-1">
                {
                    social && social.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter fa-2x white-hover"></i>
                        </a>
                    )
                }
                {
                    social && social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook fa-2x white-hover"></i>
                        </a>
                    )
                }
                {
                    social && social.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin fa-2x white-hover"></i>
                        </a>
                    )
                }
                {
                    social && social.youtube && (
                        <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube fa-2x white-hover"></i>
                        </a>
                    )
                }
                {
                    social && social.instagram && (
                        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram fa-2x white-hover"></i>
                        </a>
                    )
                }
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop; 
