import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Cropper from '../Cropper/Cropper';

import './ImageContainer.css';

const ImageContainer = ({ selectedPhoto, activeTool, setActiveTool }) => {

    const canvas = useRef();
    const [canvasCords, setCanvasCords] = useState(null);

    useEffect(() => {
        draw(selectedPhoto);
    }, [selectedPhoto]);


    const provideCord = (element) => {
        return element.getBoundingClientRect()
    };

    function draw(src) {
        console.log(src)
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
            ctx.drawImage(img, cropDimensions.left, cropDimensions.top, cropDimensions.width, cropDimensions.height, 0, 0, canvas.current.width, canvas.current.height);
            setCanvasCords(provideCord(canvas.current));
            setActiveTool(null)
        }
    }

    console.log(canvasCords)

    return (
        <div className="img-box">
            {activeTool === 'crop' && <Cropper handleCrop={handleCrop} canvasCords={canvasCords}/>}
            <div className='edit-img'>
                <canvas ref={canvas} id="canvas"/>
            </div>
        </div>
    )
};

ImageContainer.propTypes = {
    selectedPhoto: PropTypes.string,
    activeTool: PropTypes.string,
    setActiveTool: PropTypes.func
};

export default ImageContainer