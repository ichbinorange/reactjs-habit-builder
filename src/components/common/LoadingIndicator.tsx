import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
            Loading ...
        </div>
    );
}

export default LoadingIndicator;