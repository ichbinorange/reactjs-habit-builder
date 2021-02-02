import React from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import SocialSignup from './SocialSignup';
// import Alert from 'react-s-alert';

interface stateType {
    authenticated: boolean;
    from: { pathname: string };
}

const Signup: React.FC<{ content: string }> = (props) => {
    return (
        <div className="signup-container">
            { props.authenticated ? <Redirect
                to={{
                pathname: "/",
                state: { from: props.location }
            }}/> : null } 
            <div className="signup-content">
                <h1 className="signup-title">Signup with SpringSocial</h1>
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