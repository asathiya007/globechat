import React from 'react';
import "./Register.css";

const Register = () => {
    return (
        <main className="pa4 white-text background-dark top-space w-40 center br4">
            <form className="measure center-layout">
                <fieldset id="sign_up" className="ba b--transparent ph0">
                <legend className="f2 fw6 ph0 mh0 tc">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6 white-text" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white-text" type="submit" value="Register"/>
                </div>
                <div className="lh-copy mt3">
                <a href="#0" className="f6 link dim db white-text">Log In</a>
                </div>
            </form>
        </main>
    )
}

export default Register 
