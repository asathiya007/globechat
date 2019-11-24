import React, {useState} from 'react';
import "./Login.css";
import {Link, Redirect} from "react-router-dom";
import {loginUser} from "../../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Login = ({loginUser, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }); 
    
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = () => {
        loginUser(formData);
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <main className="pa4 white-text background-dark w-40 center br4 top-space">
            <div className="measure center-layout">
                <fieldset id="sign_up" className="ba b--transparent ph0">
                <legend className="f2 fw6 ph0 mh0 tc">Log In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white-text" type="email" name="email"  id="email-address" onChange={e => onChange(e)}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6 white-text" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white-text" type="password" name="password"  id="password" onChange={e => onChange(e)}/>
                </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white-text" type="submit" value="Log In" onClick={onSubmit}/>
                </div>
                <div className="lh-copy mt3">
                <p className="f6 link dim db white-text"><Link to="/register">Register</Link></p>
                </div>
            </div>
        </main>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(mapStateToProps, {loginUser})(Login); 
