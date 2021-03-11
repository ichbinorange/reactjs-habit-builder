import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import SocialSignup from './SocialSignup';
import './Signup.css';

type stateType = {
    authenticated: boolean;
    location: object;
}

const Signup: React.FC<stateType> = (props) => {
    return (
        <div className="signup-container">
            { props.authenticated ? <Redirect
                to={{
                pathname: "/",
                state: { from: props.location }
            }}/> : null } 
            <div className="signup-content">
                <h1 className="signup-title">Signup with Habit Buddy</h1>
                <SocialSignup />
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
            </div>
        </div>
    );
}

export default Signup;