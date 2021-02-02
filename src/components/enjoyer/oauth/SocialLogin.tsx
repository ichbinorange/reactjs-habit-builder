import React from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL } from '../../util/BaseUrl';
import googleLogo from '../../../img/google-logo.png';

const SocialLogin: React.FC = () => {
    return (
        <div className="social-login">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google" /> Log in with Google</a>
        </div>
    );
}

export default SocialLogin;