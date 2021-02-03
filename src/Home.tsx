import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="container">
                <div className="graf-bg-container">
                    <div className="graf-layout">
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                        <div className="graf-circle"></div>
                    </div>
                </div>
                <h1 className="home-title">Spring Boot React OAuth2 Social Login for Habit Buddy</h1>
            </div>
        </div>
    );
}

export default Home;

