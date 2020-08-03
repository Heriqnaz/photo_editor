import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = () => (
    <div className='loading-indicator'>
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
)

export default LoadingIndicator;