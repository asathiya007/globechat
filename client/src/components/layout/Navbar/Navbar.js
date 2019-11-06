import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code" /> GlobeChat
                </Link>
            </h1>
            <ul>
                <li className="f4"><Link to="/register">Register</Link></li>
                <li className="f4"><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
