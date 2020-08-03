import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default function Button({ onClick, children, color,className, disabled }) {
    return (
        <button
            onClick={onClick}
            className={`button ${disabled && 'disabled'} ${className}`}
            disabled={disabled}
            style={{ background: color }}>{children}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

