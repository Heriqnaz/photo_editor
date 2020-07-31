import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Cropper from '../Cropper/Cropper';

import './ImageContainer.css';

let isDrawing = false;
let lineStyleLocal, lineWidthLocal, lineColorLocal;

const ImageContainer = ({ selectedPhoto, activeTool, setActiveTool, lineStyle, lineWidth, lineColor }) => {

    const canvas = useRef();
    const [ canvasCords, setCanvasCords ] = useState(null);

    const provideCord = (element) => {
        return element.getBoundingClientRect()
    };

    function draw(src) {
        const ctx = canvas.current.getContext('2d');
        const img = new Image();
        img.src = src;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const ratio = img.width / img.height;
            canvas.current.height = 500;
            canvas.current.width = 500 * ratio;
            ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
            setCanvasCords(provideCord(canvas.current))
        };
    }

    function handleCrop({ left, top, width, height }) {
        const url = canvas.current.toDataURL('image/png')
        const ctx = canvas.current.getContext('2d');
        const img = new Image();
        img.src = url;
        img.onload = () => {

            const ratio = width / height;

            const cropDimensions = {
                left: left - canvasCords.left,
                top: top - canvasCords.top,
                width: width,
                height: height
            };

            canvas.current.width = 500 * ratio;
            canvas.current.height = 500;


            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
            ctx.drawImage(
                img,
                cropDimensions.left,
                cropDimensions.top,
                cropDimensions.width,
                cropDimensions.height,
                0,
                0,
                canvas.current.width,
                canvas.current.height);

            setCanvasCords(provideCord(canvas.current));
            setActiveTool(null)
        }
    }

    function startDrawingLine(e) {
        const ctx = canvas.current.getContext('2d');
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.pageX - canvasCords.left, e.pageY - canvasCords.top);
        ctx.strokeStyle = lineColorLocal;
        ctx.lineWidth = lineWidthLocal;
        ctx.lineCap = lineStyleLocal;
        ctx.lineJoin = lineStyleLocal === 'round' ? 'miter' : 'bever';
    }

    function stopDrawingLine() {
        isDrawing = false;
    }

    function drawLine(e) {
        if (isDrawing) {
            const ctx = canvas.current.getContext('2d');
            ctx.lineTo(e.pageX - canvasCords.left, e.pageY - canvasCords.top);
            ctx.stroke();
        }
    }

    useEffect(() => {
        lineStyleLocal = lineStyle;
    }, [ lineStyle ]);

    useEffect(() => {
        lineWidthLocal = lineWidth;
    }, [ lineWidth ]);

    useEffect(() => {
        lineColorLocal = lineColor;
    }, [ lineColor ]);

    useEffect(() => {
        if (activeTool === 'draw') {
            canvas.current.addEventListener('mousedown', startDrawingLine);
            canvas.current.addEventListener('mouseup', stopDrawingLine);
            canvas.current.addEventListener('mouseout', stopDrawingLine);
            canvas.current.addEventListener('mousemove', drawLine);
        } else {
            canvas.current.removeEventListener('mousedown', startDrawingLine);
            canvas.current.removeEventListener('mouseup', stopDrawingLine);
            canvas.current.removeEventListener('mouseout', stopDrawingLine);
            canvas.current.removeEventListener('mousemove', drawLine);
        }
    }, [ activeTool ])

    useEffect(() => {
        draw(selectedPhoto);
    }, [ selectedPhoto ]);

    return (
        <div className="img-box">
            {activeTool === 'crop' && <Cropper handleCrop={handleCrop} canvasCords={canvasCords}/>}
            <div className={`edit-img ${activeTool === 'draw' ? 'edit-img-draw' : ''}`} >
                <canvas ref={canvas} id="canvas"/>
            </div>
        </div>
    )
};

ImageContainer.propTypes = {
    selectedPhoto: PropTypes.string,
    activeTool: PropTypes.string,
    setActiveTool: PropTypes.func,
    lineWidth: PropTypes.string.isRequired,
    lineColor: PropTypes.string.isRequired,
    lineStyle: PropTypes.string.isRequired
};

export default ImageContainer