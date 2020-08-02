import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Cropper from '../Cropper/Cropper';
import ImageFilterTool from '../ImageFilterTool/ImageFilterTool';
import DrawImageTool from '../DrawImageTool/DrawImageTool';
import ImageFrameTool from '../ImageFrameTool/ImageFrameTool';
import './ImageContainer.css';
import {
    handleBlurFilter,
    handleBrightnessFilter,
    handleColorChangeFilter,
    handleContrastFilter,
    handleGrayscaleFilter,
    handleSaturationFilter
} from '../ImageFilterTool/ImageFilters'
import {connect} from 'react-redux';
import {setActiveTool} from '../../redux/actions';

let isDrawing = false;
let lineStyleLocal, lineWidthLocal, lineColorLocal;

const ImageContainer = ({selectedPhoto, activeTool, activeSubTool, setActiveTool}) => {

    const canvas = useRef();
    const [ canvasCords, setCanvasCords ] = useState(null);
    const [ img, setImg ] = useState(null);
    const [ lineWidth, setLineWidth ] = useState('1');
    const [ lineColor, setLineColor ] = useState('#000000');
    const [ lineStyle, setLineStyle ] = useState('round');

    useEffect(() => {
        draw(selectedPhoto);
    }, [ selectedPhoto ]);

    useEffect(() => {
        if (activeTool !== 'crop' && activeTool !== 'draw') {
            resetCanvasState();
        }
    }, [ activeTool ]);

    useEffect(() => {
        if (activeTool === 'draw') {
            canvas.current.addEventListener('mousedown', startDrawingLine);
            canvas.current.addEventListener('mouseup', stopDrawingLine);
            canvas.current.addEventListener('mouseout', stopDrawingLine);
            canvas.current.addEventListener('mousemove', drawLine);
        }
        return () => {
            canvas.current.removeEventListener('mousedown', startDrawingLine);
            canvas.current.removeEventListener('mouseup', stopDrawingLine);
            canvas.current.removeEventListener('mouseout', stopDrawingLine);
            canvas.current.removeEventListener('mousemove', drawLine);
        }

    }, [ activeTool ]);

    useEffect(() => {
        lineStyleLocal = lineStyle;
    }, [ lineStyle ]);

    useEffect(() => {
        lineWidthLocal = lineWidth;
    }, [ lineWidth ]);

    useEffect(() => {
        lineColorLocal = lineColor;
    }, [ lineColor ]);

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
        setImg(img);
    }

    function handleCrop({left, top, width, height}) {
        const url = canvas.current.toDataURL('image/png');
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
            setActiveTool('crop');

            const newimg = new Image();
            const url = canvas.current.toDataURL('image/png');
            newimg.src = url;
            setImg(newimg)
        };
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

    const resetCanvasState = () => {
        if (img) {
            const ctx = canvas.current.getContext('2d');
            const width = canvas.current.width;
            const height = canvas.current.height;
            ctx.drawImage(img, 0, 0, width, height);
            ctx.save();
        }
    };

    const prepareCanvasImage = () => {
        const url = canvas.current.toDataURL('image/png');
        const ctx = canvas.current.getContext('2d');
        const width = canvas.current.width;
        const height = canvas.current.height;
        const image = new Image;
        image.src = url;
        ctx.drawImage(img, 0, 0, width, height);
        ctx.save();
        return {ctx, image, width, height};
    };


    const handleImageFilter = (rangeValue) => {
        const {ctx, image, width, height} = prepareCanvasImage();
        switch (activeSubTool) {
        case 'filter-blur':
            handleBlurFilter(ctx, image, width, height, rangeValue);
            break;
        case 'filter-brightness':
            handleBrightnessFilter(ctx, image, width, height, rangeValue);
            break;
        case 'filter-grayscale':
            handleGrayscaleFilter(ctx, width, height, rangeValue);
            break;
        case 'filter-color':
            handleColorChangeFilter(ctx, width, height, rangeValue, lineColor);
            break;
        case 'filter-saturation':
            handleSaturationFilter(ctx, width, height, rangeValue);
            break;
        case 'filter-contrast':
            handleContrastFilter(ctx, image, width, height, rangeValue);
            break;
        default:
        }
    };


    const handleApply = () => {
        const url = canvas.current.toDataURL('image/png');
        draw(url);
        setActiveTool(null);
    };

    const handleSelectedFrame = (frameUrl) => {
        const {ctx} = prepareCanvasImage();
        const url = canvas.current.toDataURL('image/png');
        draw(url, frameUrl);
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

    return (
        <div>
            <div className="img-box">
                {activeTool === 'crop' && <Cropper handleCrop={handleCrop} canvasCords={canvasCords}/>}
                <div className={`edit-img ${activeTool === 'draw' ? 'edit-img-draw' : ''}`}>
                    <canvas ref={canvas} id="canvas"/>
                </div>
            </div>
            {activeTool === 'filter' &&
            <ImageFilterTool
                lineColor={lineColor}
                setActiveTool={setActiveTool}
                handleApplyFilter={handleApply}
                handleLineColor={handleLineColor}
                handleImageFilter={handleImageFilter}
            />}
            {activeTool === 'draw' &&
            <DrawImageTool
                handleLineStyle={handleLineStyle}
                handleLineWidth={handleLineWidth}
                handleLineColor={handleLineColor}
                handleApplyFilter={handleApply}
                lineWidth={lineWidth}
                lineColor={lineColor}
                lineStyle={lineStyle}
            />}
            {activeTool === 'frame' &&
            <ImageFrameTool
                handleSelectedFrame={handleSelectedFrame}
                handleApplyFrame={handleApply}
            />}
        </div>
    )
};

ImageContainer.propTypes = {
    selectedPhoto: PropTypes.string,
    activeTool: PropTypes.string,
    activeSubTool: PropTypes.string,
    setActiveTool: PropTypes.func,
};

const mapStateToProps = state => ({
    activeTool: state.tool.activeTool,
    activeSubTool: state.tool.activeSubTool,
    selectedPhoto: state.photo.selectedPhoto
});

const mapDispatchToProps = dispatch => ({
    setActiveTool: (tool) => dispatch(setActiveTool(tool))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer)