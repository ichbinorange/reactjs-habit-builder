import React from 'react';
import { ACCESS_TOKEN } from '../../util/BaseUrl';
import { Redirect, useLocation } from 'react-router-dom'

interface stateType {
    authenticated: boolean;
    from: { pathname: string };
}

const OAuth2RedirectHandler: React.FC<{ content: string }> = (props) => {
    const getUrlParameter = (name: string) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        return <Redirect to={{
            pathname: "/profile",
            state: { from: props.location }
        }}/>; 
    } else {
        return <Redirect to={{
            pathname: "/login",
            state: { 
                from: props.location,
                error: error 
            }
        }}/>; 
    }
}

export default OAuth2RedirectHandler;