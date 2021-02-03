import React from 'react';
import './Signup.css';
import { GOOGLE_AUTH_URL } from '../../util/BaseUrl';
import googleLogo from '../../../img/google-logo.png';

const SocialSignup: React.FC = () => {
    return (
        <div className="social-signup">
            <a className="btn btn-block social-btn google" href={ GOOGLE_AUTH_URL }>
                <img src={ googleLogo } alt="Google" /> Sign up with Google</a>
        </div>
    );
}

export default SocialSignup;