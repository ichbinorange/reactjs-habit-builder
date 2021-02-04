import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

type stateType = {
    authenticated: boolean;
    onLogout: {(): void;};
};

const AppHeader: React.FC<stateType> = (props) => {
    return (
        <header className="app-header">
            <div className="container">
                <div className="app-branding">
                    <Link to="/" className="app-title">Habit Buddy</Link>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        { props.authenticated ? (
                            <ul>
                                <li>
                                    <NavLink to="/habit">Habit</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                   </li>
                                <li>
                                    <a className="thumbnail" onClick={ props.onLogout }>Logout</a>
                                </li>
                            </ul>
                        ): (
                            <ul>
                                <li>
                                    <NavLink to="/login">Login</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/signup">Signup</NavLink>        
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;