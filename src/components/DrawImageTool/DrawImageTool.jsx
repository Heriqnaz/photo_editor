import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './DrowImageTool.css'

const DrawImageTool = ({
    lineStyle,
    lineWidth,
    lineColor,
    handleLineStyle,
    handleLineWidth,
    handleLineColor,
}) => {
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
        <Container className='draw-image-tools'>
            <Row>
                <Col md="auto">
                    Line style:
                    <div className="form-check">
                        <div>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="lineStyle"
                                id="lineStyle1"
                                value="round"
                                onChange={onLineStyle}
                                checked={lineStyle === 'round'}
                            />
                            <label className="form-check-label" htmlFor="lineStyle1">
                                Round
                            </label>
                        </div>
                        <div>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="lineStyle"
                                id="lineStyle2"
                                value="square"
                                onChange={onLineStyle}
                                checked={lineStyle === 'square'}
                            />
                            <label className="form-check-label" htmlFor="lineStyle2">
                                Square
                            </label>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='line-thickness'>
                        <label htmlFor="formControlRange">Line Thickness: {lineWidth}</label>
                        <input
                            type="range"
                            value={lineWidth}
                            onChange={onLineWidth}
                            max={20}
                            step={0.1}
                            min={0.1}
                            className="form-control-range bg-dark text-dark"
                            id="formControlRange"/>
                    </div>

                </Col>
                <Col xs='2' lg="2">
                    <label htmlFor="color">Color: </label>
                    <input
                        type="color"
                        className="form-control"
                        value={lineColor}
                        onChange={onLineColor}
                        id="color"/>
                </Col>
            </Row>
        </Container>
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

