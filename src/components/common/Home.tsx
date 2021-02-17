import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide w-75 d-block mx-auto" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100 img-fluid img-thumbnail" src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Independent backpacker?" />
                    <div className="carousel-caption d-none d-md-block">
                        <h4 className="text-white bg-dark">Independent backpacker?</h4>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid img-thumbnail" src="https://images.unsplash.com/photo-1580894908361-967195033215?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Build a mobile app in half a year?" />
                    <div className="carousel-caption d-none d-md-block">
                        <h4 className="text-white bg-dark">Build a mobile app in half a year?</h4>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 img-fluid img-thumbnail" src="https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80" alt="Cook delicious Taiwanese food?" />
                    <div className="carousel-caption d-none d-md-block">
                        <h4 className="text-white bg-dark">Cook delicious Taiwanese food?</h4>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

export default Home;

