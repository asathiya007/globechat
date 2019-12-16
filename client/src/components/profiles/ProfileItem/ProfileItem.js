import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const ProfileItem = ({
    profile: {
        user: {
            _id, 
            name,
            avatar
        },
        location, 
        bio,
        email,
        phone
    }
}) => {
    return (
        <div className="profile background-dark br4">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                <li className="text-primary">
                    <i className="fas fa-user"></i> {bio}
                </li>
                <br/>
                <li className="text-primary">
                    <i className="fas fa-envelope"></i> {email}
                </li>
                <li className="text-primary">
                    <i className="fas fa-phone"></i> {phone}
                </li>
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
