import React from 'react';
import './Login.css';
import { Link, Redirect } from 'react-router-dom'
import SocialLogin from './SocialLogin';
// import Alert from 'react-s-alert';

interface stateType {
    authenticated: boolean;
    location: object;
 }

const Login: React.FC<stateType> = (props) => {
    // componentDidMount() {
    //     // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    //     // Here we display the error and then remove the error query parameter from the location.
    //     if(this.props.location.state && this.props.location.state.error) {
    //         setTimeout(() => {
    //             Alert.error(this.props.location.state.error, {
    //                 timeout: 5000
    //             });
    //             this.props.history.replace({
    //                 pathname: this.props.location.pathname,
    //                 state: {}
    //             });
    //         }, 100);
    //     }
    // }
    
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
