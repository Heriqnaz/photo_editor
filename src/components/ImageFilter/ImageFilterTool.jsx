import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const ImageFilterTool = ({
    handleBrightnessFilter,
    handleBlurFilter,
    handleGrayscaleFilter,
    handleApplyFilter,
    handleLineColor,
    activeSubTool,
    lineColor,
}) => {
    const [ rangeValue, setRangeValue ] = useState(0);

    const handleFilterRange = (event) => {
        const value = event.target.value;
        setRangeValue(event.target.value)
        switch (activeSubTool) {
        case 'filter-brightness':
            handleBrightnessFilter(value);
            break;
        case 'filter-blur':
            handleBlurFilter(value);
            break;
        case 'filter-grayscale':
            handleGrayscaleFilter(value);
            break;
        default:
        }
    };

    const onLineColor = (e) => {
        handleLineColor(e.target.value)
    };
    const onApply = () => {
        handleApplyFilter();
    };

    return (
        <div>
            {activeSubTool &&
            <div>
                <input
                    id="slider"
                    type="range"
                    min={activeSubTool === 'filter-brightness' ? '-100' : '0'}
                    max="100"
                    value={rangeValue}
                    step="1"
                    onChange={handleFilterRange}/>
                <span id='val'/>
                <button onClick={onApply}>Apply</button>
            </div>
            }
            {activeSubTool === 'filter-blur' &&
            <div>
                <label htmlFor="color">Color: </label>
                <input
                    type="color"
                    className="form-control"
                    value={lineColor}
                    onChange={onLineColor}
                    id="color"/>
            </div>
            }
        </div>
    )
};

ImageFilterTool.propTypes = {
    handleBrightnessFilter: PropTypes.func,
    handleGrayscaleFilter: PropTypes.func,
    handleApplyFilter: PropTypes.func,
    handleBlurFilter: PropTypes.func,
    activeSubTool: PropTypes.string,
    lineColor: PropTypes.string.isRequired,
    handleLineColor: PropTypes.func,
};

export default ImageFilterTool;