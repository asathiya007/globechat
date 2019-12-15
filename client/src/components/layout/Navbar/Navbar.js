import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logoutUser} from "../../../actions/auth";

const Navbar = ({auth: {loading, isAuthenticated}, logoutUser}) => {
    const guestLinks = (
        <ul>
            <li className="f4"><Link to="/users">GlobeChatters</Link></li>
            <li className="f4"><Link to="/register">Register</Link></li>
            <li className="f4"><Link to="/login">Login</Link></li>
        </ul>
    ); 

    const authLinks = (
        <ul>
            <li className="f4"><Link to="/users">GlobeChatters</Link></li>
            <li className="f4">
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{" "}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li className="f4" onClick={logoutUser}>
                <Link to="/">
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code" /> GlobeChat
                </Link>
            </h1>
            {!loading ? (
                <Fragment>
                    {isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            ) : (
                <Fragment>
                    {guestLinks}
                </Fragment>
            )}
        </nav>
    )
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
