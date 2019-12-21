import React, {Fragment, useEffect} from 'react'; 
import PropTypes from 'prop-types'; 
import {connect} from "react-redux";
import Spinner from "../../layout/Spinner/Spinner";
import {getAllUsers} from "../../../actions/profile";
import ProfileItem from "../ProfileItem/ProfileItem";

const Profiles = ({getAllUsers, profile: {allUsers, loading}}) => {
    useEffect(() => {
        getAllUsers();  
    }, [getAllUsers]);

    return (
        <Fragment>
            {loading ? <Spinner/> :
                <div>
                    <h1 className="large white-text">
                        GlobeChatters 
                    </h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop white-hover"></i> Browse and connect with other chatters!
                    </p>
                    <div className="profiles">
                        {allUsers.length > 0 ? (
                            allUsers.map(user => 
                                <ProfileItem key={user._id} profile={user}/>)
                        ) : <h4>No profiles found...</h4>}
                    </div>
                </div>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
}); 

export default connect(mapStateToProps, {getAllUsers})(Profiles);
