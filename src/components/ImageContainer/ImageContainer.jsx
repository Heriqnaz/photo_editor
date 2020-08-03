import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {applyImageChange, setActiveTool} from '../../redux/actions';


import Cropper from '../Cropper/Cropper';

import './ImageContainer.css';
import ImageFilterTool from '../ImageFilterTool/ImageFilterTool';
import DrawImageTool from '../DrawImageTool/DrawImageTool';
import ImageFrameTool from '../ImageFrameTool/ImageFrameTool';
import ImageStickerTool from "../../ImageStickerTool/ImageStickerTool";

let isDrawing = false;
let lineStyleLocal, lineWidthLocal, lineColorLocal;

let stickerImageX = 50;
let stickerImageY = 50;
let imageWidth, imageRight, imageBottom, imageHeight, startX, startY, imageSticker;

const pi2 = Math.PI * 2;
const resizerRadius = 8;
const rr = resizerRadius * resizerRadius;
let draggingResizer = {
    x: 0,
    y: 0
};
let draggingImage = false;


const ImageContainer = ({selectedPhoto, activeTool, setActiveTool, activeSubTool, onImageChangeApply}) => {

    const canvas = useRef();
    const canvasSticker = useRef();

    const [canvasCords, setCanvasCords] = useState(null);
    const [img, setImg] = useState(null);

    const [lineWidth, setLineWidth] = useState('1');
    const [lineColor, setLineColor] = useState('#000000');
    const [lineStyle, setLineStyle] = useState('round');

    useEffect(() => {
        if (selectedPhoto) {
            onImageChangeApply(selectedPhoto);
        }
    }, []);

    useEffect(() => {
        draw(selectedPhoto);
    }, [selectedPhoto]);


    useEffect(() => {
        if (activeTool === 'draw') {
            canvas.current.addEventListener('mousedown', startDrawingLine);
            canvas.current.addEventListener('mouseup', () => {
                stopDrawingLine();
                const url = canvas.current.toDataURL('image/jpeg');
                onImageChangeApply(url);
            });
            canvas.current.addEventListener('mouseout', stopDrawingLine);
            canvas.current.addEventListener('mousemove', drawLine);
        }

        if (activeTool === 'stickers') {
            canvasSticker.current.addEventListener('mousedown', handleMouseDown);
            canvasSticker.current.addEventListener('mouseup', handleMouseUp);
            canvasSticker.current.addEventListener('mouseout', handleMouseOut);
            canvasSticker.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            canvas.current.removeEventListener('mousedown', startDrawingLine);
            canvas.current.removeEventListener('mouseup', stopDrawingLine);
            canvas.current.removeEventListener('mouseout', stopDrawingLine);
            canvas.current.removeEventListener('mousemove', drawLine);
            if (canvasSticker.current) {
                canvasSticker.current.removeEventListener('mousedown', handleMouseDown);
                canvasSticker.current.removeEventListener('mouseup', handleMouseUp);
                canvasSticker.current.removeEventListener('mouseout', handleMouseOut);
                canvasSticker.current.removeEventListener('mousemove', handleMouseMove);
            }
        }

    }, [activeTool]);

    const provideCord = (element) => {
        return element.getBoundingClientRect()
    };

    function draw(src, frameUrl) {
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

        if (frameUrl) {
            const frameImg = new Image();
            frameImg.src = frameUrl;
            frameImg.crossOrigin = 'anonymous';
            frameImg.onload = () => {
                ctx.drawImage(frameImg, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
        setImg(img)
    }

    function handleCrop({left, top, width, height}) {
        const url = canvas.current.toDataURL('image/jpeg')
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
            const newimg = new Image();
            const url = canvas.current.toDataURL('image/jpeg');
            newimg.src = url;
            setImg(newimg)
            onImageChangeApply(url);
        }
    }

    const handleLineStyle = (value) => {
        setLineStyle(value)
    };
    const handleLineWidth = (value) => {
        setLineWidth(value)
    };
    const handleLineColor = (value) => {
        setLineColor(value)
    };

    const prepareCanvasImage = () => {
        const url = canvas.current.toDataURL('image/jpeg');
        const ctx = canvas.current.getContext('2d');
        const width = canvas.current.width;
        const height = canvas.current.height;
        const image = new Image;
        ctx.drawImage(img, 0, 0, width, height);
        image.src = url;
        ctx.drawImage(img, 0, 0, width, height);
        ctx.save();
        return {ctx, image, width, height};
    };

    const handleBlurFilter = (value) => {
        const {ctx, width, image, height} = prepareCanvasImage();
        ctx.filter = `blur(${value / 4}px)`;
        ctx.drawImage(image, width, height);

    };


    const handleBrightnessFilter = (value) => {
        const {ctx, image, width, height} = prepareCanvasImage();

        if (value < 0) {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'black';
            ctx.globalAlpha = -value / 100;
            ctx.fillRect(0, 0, width, height);
        } else if (value > 0) {
            ctx.fillStyle = 'white';
            ctx.globalCompositeOperation = 'lighten';
            ctx.globalAlpha = 1;
            ctx.drawImage(image, 0, 0);
            ctx.globalAlpha = value / 100;
            ctx.fillRect(0, 0, width, height);
        }
        ctx.restore();
    };

    const handleGrayscaleFilter = (value) => {
        const {ctx, width, height} = prepareCanvasImage();
        if (value <= 100) {
            ctx.globalCompositeOperation = 'color';
            ctx.fillStyle = 'black';
            ctx.globalAlpha = value / 100;
            ctx.fillRect(0, 0, width, height);
        }
        ctx.restore();
    };

    const handleColorChangeFilter = (rangeValue) => {
        const {ctx, width, height} = prepareCanvasImage();
        if (lineColor === '#000000') {
            ctx.globalCompositeOperation = 'multiply';
        } else {
            ctx.globalCompositeOperation = 'lighten';
        }
        ctx.fillStyle = lineColor;
        ctx.globalAlpha = rangeValue / 100;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    };

    const handleSaturationFilter = (rangeValue) => {
        const {ctx, width, height} = prepareCanvasImage();
        ctx.globalCompositeOperation = 'saturation';
        ctx.fillStyle = 'red';
        ctx.globalAlpha = rangeValue / 100;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    };

    const handleContrastFilter = (rangeValue) => {
        const {ctx, width, image, height} = prepareCanvasImage();
        ctx.filter = `contrast(${rangeValue / 4})`;
        ctx.drawImage(image, width, height);
    };


    const handleSelectedSticker = (frameUrl) => {
        const img = new Image();
        img.src = frameUrl;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            imageWidth = img.width;
            imageHeight = img.height;
            imageRight = stickerImageX + imageWidth;
            imageBottom = stickerImageY + imageHeight;
            imageSticker = img;
            canvasSticker.current.height = canvas.current.height;
            canvasSticker.current.width = canvas.current.width;
            drawSticker(true, false, frameUrl);
        };
        img.src = frameUrl;
    };

    const handleApplySticker = () => {
        const ctx = canvas.current.getContext('2d');
        drawSticker(false, false)
        ctx.drawImage(canvasSticker.current, 0, 0);
        const url = canvas.current.toDataURL('image/jpeg');
        draw(url)
        onImageChangeApply(url);
        setActiveTool(null)
    };


    const drawSticker = (withAnchors, withBorders) => {
        const ctx = canvasSticker.current.getContext('2d');
        // clear the canvas
        ctx.clearRect(0, 0, canvasSticker.current.width, canvasSticker.current.height);
        // debugger
        ctx.drawImage(imageSticker, 0, 0, imageSticker.width, imageSticker.height, stickerImageX, stickerImageY, imageWidth, imageHeight);
        if (withAnchors) {
            drawDragAnchor(stickerImageX, stickerImageY, ctx);
            drawDragAnchor(imageRight, stickerImageY, ctx);
            drawDragAnchor(imageRight, imageBottom, ctx);
            drawDragAnchor(stickerImageX, imageBottom, ctx);
        }
        if (withBorders) {
            ctx.beginPath();
            ctx.moveTo(stickerImageX, stickerImageY);
            ctx.lineTo(imageRight, stickerImageY);
            ctx.lineTo(imageRight, imageBottom);
            ctx.lineTo(stickerImageX, imageBottom);
            ctx.closePath();
            ctx.stroke();
        }
    };

    function drawDragAnchor(x, y, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, resizerRadius, 0, pi2);
        ctx.closePath();
        ctx.fill();
    }

    function handleMouseDown(e) {
        if (imageSticker) {
            const offsetX = canvasCords.left;
            const offsetY = canvasCords.top;
            startX = parseInt(e.clientX - offsetX);
            startY = parseInt(e.clientY - offsetY);
            draggingResizer = anchorHitTest(startX, startY);
            draggingImage = draggingResizer < 0 && hitImage(startX, startY);
        }
    }

    function handleMouseUp(e) {
        if (imageSticker) {
            draggingResizer = -1;
            draggingImage = false;
            drawSticker(true, false);
        }
    }

    function handleMouseOut(e) {
        if (imageSticker) {
            handleMouseUp(e);
        }
    }

    function handleMouseMove(e) {
        if (!imageSticker) {
            return
        }

        const offsetX = canvasCords.left;
        const offsetY = canvasCords.top;
        if (draggingResizer > -1) {
            const mouseX = parseInt(e.clientX - offsetX);
            const mouseY = parseInt(e.clientY - offsetY);

            // resize the image
            switch (draggingResizer) {
                case 0:
                    //top-left
                    stickerImageX = mouseX;
                    imageWidth = imageRight - mouseX;
                    stickerImageY = mouseY;
                    imageHeight = imageBottom - mouseY;
                    break;
                case 1:
                    //top-right
                    stickerImageY = mouseY;
                    imageWidth = mouseX - stickerImageX;
                    imageHeight = imageBottom - mouseY;
                    break;
                case 2:
                    //bottom-right
                    imageWidth = mouseX - stickerImageX;
                    imageHeight = mouseY - stickerImageY;
                    break;
                case 3:
                    //bottom-left
                    stickerImageX = mouseX;
                    imageWidth = imageRight - mouseX;
                    imageHeight = mouseY - stickerImageY;
                    break;
            }

            if (imageWidth < 25) {
                imageWidth = 25;
            }
            if (imageHeight < 25) {
                imageHeight = 25;
            }

            // set the image right and bottom
            imageRight = stickerImageX + imageWidth;
            imageBottom = stickerImageY + imageHeight;

            // redraw the image with resizing anchors
            drawSticker(true, true);

        } else if (draggingImage) {

            const mouseX = parseInt(e.clientX - offsetX);
            const mouseY = parseInt(e.clientY - offsetY);

            // move the image by the amount of the latest drag
            const dx = mouseX - startX;
            const dy = mouseY - startY;
            stickerImageX += dx;
            stickerImageY += dy;
            imageRight += dx;
            imageBottom += dy;
            // reset the startXY for next time
            startX = mouseX;
            startY = mouseY;

            // redraw the image with border
            drawSticker(false, true);
        }
    }

    function anchorHitTest(x, y) {
        let dx, dy;

        // top-left
        dx = x - stickerImageX;
        dy = y - stickerImageY;
        if (dx * dx + dy * dy <= rr) {
            return (0);
        }
        // top-right
        dx = x - imageRight;
        dy = y - stickerImageY;
        if (dx * dx + dy * dy <= rr) {
            return (1);
        }
        // bottom-right
        dx = x - imageRight;
        dy = y - imageBottom;
        if (dx * dx + dy * dy <= rr) {
            return (2);
        }
        // bottom-left
        dx = x - stickerImageX;
        dy = y - imageBottom;
        if (dx * dx + dy * dy <= rr) {
            return (3);
        }
        return (-1);

    }

    function hitImage(x, y) {
        return (x > stickerImageX && x < stickerImageX + imageWidth && y > stickerImageY && y < stickerImageY + imageHeight);
    }


    const handleApply = () => {
        const url = canvas.current.toDataURL('image/jpeg');
        draw(url);

        onImageChangeApply(url);
        setActiveTool(null);
    };

    const handleSelectedFrame = (frameUrl) => {
        const {ctx} = prepareCanvasImage();
        const url = canvas.current.toDataURL('image/jpeg');
        draw(url, frameUrl);
        ctx.restore();
    };

    const handleCancelApply = () => {
        const {ctx} = prepareCanvasImage();
        ctx.restore();
    };

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
    }, [lineStyle]);

    useEffect(() => {
        lineWidthLocal = lineWidth;
    }, [lineWidth]);

    useEffect(() => {
        lineColorLocal = lineColor;
    }, [lineColor]);

    return (
        <div>
            <div className="img-box">
                {activeTool === 'crop' && <Cropper handleCrop={handleCrop} canvasCords={canvasCords}/>}
                <div className={`cnvs edit-img ${activeTool === 'draw' ? 'edit-img-draw' : ''}`}>
                    <canvas ref={canvas} id="canvas"/>
                    {activeTool === 'stickers' &&
                    <canvas ref={canvasSticker} id="canvasSticker" className="cnvs"/>
                    }
                </div>
            </div>
            {activeTool === 'filter' &&
            <ImageFilterTool
                activeSubTool={activeSubTool}
                lineColor={lineColor}
                setActiveTool={setActiveTool}
                handleBrightnessFilter={handleBrightnessFilter}
                handleBlurFilter={handleBlurFilter}
                handleGrayscaleFilter={handleGrayscaleFilter}
                handleColorChangeFilter={handleColorChangeFilter}
                handleContrastFilter={handleContrastFilter}
                handleSaturationFilter={handleSaturationFilter}
                handleApplyFilter={handleApply}
                handleLineColor={handleLineColor}
                handleCancelApplyFilter={handleCancelApply}
            />}
            {activeTool === 'draw' &&
            <DrawImageTool
                handleLineStyle={handleLineStyle}
                handleLineWidth={handleLineWidth}
                handleLineColor={handleLineColor}
                lineWidth={lineWidth}
                lineColor={lineColor}
                lineStyle={lineStyle}
            />}
            {activeTool === 'frame' &&
            <ImageFrameTool
                handleSelectedFrame={handleSelectedFrame}
                handleApplyFrame={handleApply}
                handleCancelApplyFrame={handleCancelApply}
            />}
            {activeTool === 'stickers' &&
            <ImageStickerTool
                handleSelectedSticker={handleSelectedSticker}
                handleApplySticker={handleApplySticker}
            />}
        </div>
    )
};

ImageContainer.propTypes = {
    selectedPhoto: PropTypes.string,
    activeTool: PropTypes.string,
    setActiveTool: PropTypes.func,
    activeSubTool: PropTypes.string,
    onImageChangeApply: PropTypes.func
};

const mapStateToProps = state => ({
    activeTool: state.tool.activeTool,
    selectedPhoto: state.photo.selectedPhoto
});

const mapDispatchToProps = dispatch => ({
    setActiveTool: (tool) => dispatch(setActiveTool(tool)),
    onImageChangeApply: url => {
        dispatch(applyImageChange(url));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer)