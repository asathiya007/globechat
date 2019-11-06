import React from 'react';
import "./Login.css";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <main className="pa4 white-text background-dark top-space w-40 center br4">
            <div className="measure center-layout">
                <fieldset id="sign_up" className="ba b--transparent ph0">
                <legend className="f2 fw6 ph0 mh0 tc">Log In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6 white-text" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white-text" type="submit" value="Log In"/>
                </div>
                <div className="lh-copy mt3">
                <p className="f6 link dim db white-text"><Link to="/register">Register</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login 
