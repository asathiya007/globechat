import React, {useState} from 'react';
import "./Register.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {produceAlert} from "../../../actions/alert";
import {registerUser} from "../../../actions/auth";
import PropTypes from "prop-types";

const Register = ({produceAlert, registerUser}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const {name, email, password, password2} = formData; 

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value}); 
    }

    const onSubmit = () => {
        if (password !== password2) {
            produceAlert("passwords do not match", "danger");
        } else {
            registerUser({name, email, password});
        }
    }

    return (
        <main className="pa4 white-text background-dark top-space w-40 center br4">
            <div className="measure center-layout">
                <fieldset id="sign_up" className="ba b--transparent ph0">
                <legend className="f2 fw6 ph0 mh0 tc">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white-text" type="name" name="name"  id="name" value={name} onChange={e => onChange(e)}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                    <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white-text" type="email" name="email" id="email"
                        value={email} onChange={e => onChange(e)}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6 white-text" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white-text" type="password" name="password"  id="password" value={password} onChange={e => onChange(e)}/>
                </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 white-text" htmlFor="password2">Re-Enter Password</label>
                        <input className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100 white-text" type="password" name="password2" id="password2" value={password2} onChange={e => onChange(e)}/>
                    </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white-text" type="submit" value="Register" onClick={onSubmit}/>
                </div>
                <div className="lh-copy mt3">
                <p className="f6 link dim db white-text"><Link to="/login">Log In</Link></p>
                </div>
            </div>
        </main>
    )
}

Register.propTypes = {
    produceAlert: PropTypes.func.isRequired
}; 

export default connect(null, {produceAlert, registerUser})(Register); 
