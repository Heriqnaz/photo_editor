import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap';
import './ImageFilterTool.css'
import Button from "../Button/Button";

const ImageFilterTool = ({
                             handleBrightnessFilter,
                             handleBlurFilter,
                             handleGrayscaleFilter,
                             handleApplyFilter,
                             handleLineColor,
                             activeSubTool,
                             lineColor,
                             handleCancelApplyFilter
                         }) => {
    const [rangeValue, setRangeValue] = useState(0);

    let isApply = false;

    const handleFilterRange = (event) => {
        isApply = false;
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
        isApply = true;
        handleApplyFilter();
    };

    useEffect(() => {
        return () => {
            if (!isApply) handleCancelApplyFilter()
        }
    }, []);

    return (
        <Container className='image-filter-tools'>
            {activeSubTool &&
            <>
                <Col md="auto">
                    <Button className='apply-button' color='#2980b9' onClick={onApply}>Apply</Button>
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
        </Container>
    )
};

ImageFilterTool.propTypes = {
    handleBrightnessFilter: PropTypes.func,
    handleGrayscaleFilter: PropTypes.func,
    handleApplyFilter: PropTypes.func,
    handleBlurFilter: PropTypes.func,
    handleCancelApplyFilter: PropTypes.func,
    activeSubTool: PropTypes.string,
    lineColor: PropTypes.string.isRequired,
    handleLineColor: PropTypes.func,
};

const mapStateToProps = state => ({
    activeSubTool: state.tool.activeSubTool
});

export default connect(mapStateToProps)(ImageFilterTool);