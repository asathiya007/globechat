import React, {Fragment} from 'react'; 
import PropTypes from 'prop-types'; 

const ProfileAbout = ({profile: {
    bio, 
    user: {
        name
    }
}}) => {
    return (
        <div className="profile-about background-dark p-2 br4">
            <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
            {bio && (
                <Fragment>
                    <p>
                        {bio}
                    </p>
                </Fragment>
            )}
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout; 
