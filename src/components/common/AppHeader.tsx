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
                <div className="app-options">
                    <nav className="app-nav fixed-top navbar-light bg-light">
                        <Link to="/" className="navbar-brand navbar-nav mr-auto text-center header-font"><h1 className="display-3">Habit Buddy</h1></Link>
                        { props.authenticated ? (
                            <ul className="nav justify-content-end">
                                <li>
                                    <NavLink to="/habit">Habit</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/habitTracker">Habit Tracker</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/friendship">Friends</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <a className="thumbnail" onClick={ props.onLogout }>Logout</a>
                                </li>
                            </ul>
                        ): (
                            <ul className="nav justify-content-end">
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