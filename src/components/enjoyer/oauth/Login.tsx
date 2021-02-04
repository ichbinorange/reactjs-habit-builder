import React from 'react';
import './Login.css';
import { Link, Redirect } from 'react-router-dom'
import SocialLogin from './SocialLogin';
// import Alert from 'react-s-alert';

type stateType = {
    authenticated: boolean;
    location: object;
}

const Login: React.FC<stateType> = (props) => {
    if(props.authenticated) {
        return <Redirect
            to={{
            pathname: "/",
            state: { from: props.location }
        }}/>;            
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to Habit Buddy</h1>
                <SocialLogin />
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        </div>
    );
}

export default Login;
