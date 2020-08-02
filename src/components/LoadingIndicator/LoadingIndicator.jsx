import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => (
    <div className='d-flex justify-content-center'>
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
)

export default LoadingIndicator;