import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './ImageFilterTool.css'

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
        <Container className='image-filter-tools'>
            <Row>

                {activeSubTool &&
                <>
                    <Col md="auto">
                        <button className='apply-button' onClick={onApply}>Apply</button>
                    </Col>
                    <Col>
                        <label htmlFor="formControlRange">Color: {rangeValue}</label>
                        <input
                            type="range"
                            min={activeSubTool === 'filter-brightness' ? '-100' : '0'}
                            max="100"
                            value={rangeValue}
                            step="1"
                            onChange={handleFilterRange}/>
                    </Col>
                </>
                }
                {activeSubTool === 'filter-blur' &&
                <Col xs='2' lg="2">
                    <input
                        type="color"
                        className="form-control"
                        value={lineColor}
                        onChange={onLineColor}
                        id="color"/>
                </Col>
                }
            </Row>
        </Container>
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