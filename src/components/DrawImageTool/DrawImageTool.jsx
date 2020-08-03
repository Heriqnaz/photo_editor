import React from 'react';
import PropTypes from 'prop-types';

import './DrowImageTool.css'

const DrawImageTool = ({ lineStyle, lineWidth, lineColor, handleLineStyle, handleLineWidth, handleLineColor }) => {
    const onLineStyle = (e) => {
        handleLineStyle(e.target.value)
    };
    const onLineWidth = (e) => {
        handleLineWidth(e.target.value)
    };
    const onLineColor = (e) => {
        handleLineColor(e.target.value)
    };
    return (
        <div className='draw-image-tools'>
            <div>
                <strong>Line style</strong>
                <div>
                    <div>
                        <input
                            type="radio"
                            name="lineStyle"
                            id="lineStyle1"
                            value="round"
                            onChange={onLineStyle}
                            checked={lineStyle === 'round'}
                        />
                        <label htmlFor="lineStyle1">
                            Round
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="lineStyle"
                            id="lineStyle2"
                            value="square"
                            onChange={onLineStyle}
                            checked={lineStyle === 'square'}
                        />
                        <label htmlFor="lineStyle2">
                            Square
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="formControlRange">Line Thickness: {lineWidth}</label>
                <input
                    type="range"
                    value={lineWidth}
                    onChange={onLineWidth}
                    max={20}
                    step={0.1}
                    min={0.1}
                    id="formControlRange"/>
            </div>
            <div>
                <label htmlFor="color"><strong>Color</strong></label>
                <input
                    type="color"
                    value={lineColor}
                    onChange={onLineColor}
                    id="color"/>
            </div>
        </div>
    )
};

DrawImageTool.propTypes = {
    handleLineStyle: PropTypes.func,
    handleLineColor: PropTypes.func,
    handleLineWidth: PropTypes.func,
    lineStyle: PropTypes.string.isRequired,
    lineWidth: PropTypes.string.isRequired,
    lineColor: PropTypes.string.isRequired
};

export default DrawImageTool;

