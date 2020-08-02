import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Col, Container, Row} from 'react-bootstrap';
import './ImageFilterTool.css'

const ImageFilterTool = ({
    handleImageFilter,
    handleApplyFilter,
    handleLineColor,
    activeSubTool,
    lineColor,
}) => {
    const [ rangeValue, setRangeValue ] = useState(0);

    const handleFilterRange = (event) => {
        const value = event.target.value;
        setRangeValue(event.target.value)
        handleImageFilter(value)
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
                            className="multi-range"
                            step="1"
                            onChange={handleFilterRange}/>
                    </Col>
                </>
                }
                {activeSubTool === 'filter-color' &&
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
    handleImageFilter: PropTypes.func,
    handleApplyFilter: PropTypes.func,
    activeSubTool: PropTypes.string,
    lineColor: PropTypes.string.isRequired,
    handleLineColor: PropTypes.func,
};

const mapStateToProps = state => ({
    activeSubTool: state.tool.activeSubTool
});

export default connect(mapStateToProps)(ImageFilterTool);