import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import './Cropper.css'

const Cropper = ({ canvasCords, handleCrop }) => {

    const crop = useRef();
    const requestRef = useRef();
    // Minimum resizable area
    const minWidth = 60;
    const minHeight = 40;
    // Thresholds
    const MARGINS = 4;
    // End of what's configurable.
    let clicked = null;
    let onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;
    let b, x, y, e;
    let redraw = false;


    useEffect(() => {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            removeAllEvents()
        }

    }, []);

    const removeAllEvents = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        cancelAnimationFrame(requestRef.current)
    };

    const handleCropping = () => {
        const cropCords = {
            left: crop.current.getBoundingClientRect().left,
            right: crop.current.getBoundingClientRect().right,
            top: crop.current.getBoundingClientRect().top,
            bottom: crop.current.getBoundingClientRect().bottom,
            height: crop.current.getBoundingClientRect().height,
            width: crop.current.getBoundingClientRect().width,
        };
        removeAllEvents();
        handleCrop(cropCords);
    };

    const onTouchDown = (e) => {
        onDown(e.touches[0]);
        e.preventDefault();
    };

    const onTouchMove = (e) => {
        onMove(e.touches[0]);
    };

    const onTouchEnd = (e) => {
        if (e.touches.length === 0) onUp(e.changedTouches[0]);
    };

    const onMouseDown = (e) => {
        onDown(e);
        e.preventDefault();
    };

    const onDown = (e) => {
        calc(e);

        let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;


        clicked = {
            x: x,
            y: y,
            cx: e.clientX,
            cy: e.clientY,
            w: b.width,
            h: b.height,
            isResizing: isResizing,
            isMoving: !isResizing && canMove(true),
            onTopEdge: onTopEdge,
            onLeftEdge: onLeftEdge,
            onRightEdge: onRightEdge,
            onBottomEdge: onBottomEdge
        };

    };

    const canMove = (bool) => {
        return bool;
    };

    const calc = (e) => {
        b = crop.current.getBoundingClientRect();
        x = e.clientX - b.left;
        y = e.clientY - b.top;

        onTopEdge = y < MARGINS;
        onLeftEdge = x < MARGINS;
        onRightEdge = x >= b.width - MARGINS;
        onBottomEdge = y >= b.height - MARGINS;
    }

    const onMove = (ee) => {

        calc(ee);
        e = ee;
        redraw = true;
    };

    const animate = () => {
        requestRef.current = requestAnimationFrame(animate);

        const cropCords = {
            left: crop.current.getBoundingClientRect().left,
            right: crop.current.getBoundingClientRect().right,
            top: crop.current.getBoundingClientRect().top,
            bottom: crop.current.getBoundingClientRect().bottom,
            height: crop.current.getBoundingClientRect().height,
            width: crop.current.getBoundingClientRect().width,
        };

        if (!redraw) return;

        redraw = false;

        if (clicked && clicked.isResizing) {
            // console.log(canvasCords)
            if (clicked.onRightEdge) {
                if (e.clientX > canvasCords.right) {
                    crop.current.style.width = canvasCords.right - cropCords.left - 1 + 'px'
                } else {
                    crop.current.style.width = Math.max(x, minWidth) + 'px';
                }
            }
            if (clicked.onBottomEdge) {
                if (e.clientY > canvasCords.bottom) {
                    crop.current.style.height = canvasCords.bottom - cropCords.top - 1 + 'px'
                } else {
                    crop.current.style.height = Math.max(y, minHeight) + 'px'
                }
            }
            ;

            if (clicked.onLeftEdge && e.clientX > canvasCords.left) {
                let currentWidth = Math.max(clicked.cx - e.clientX + clicked.w, minWidth);
                if (currentWidth > minWidth) {
                    crop.current.style.width = currentWidth + 'px';
                    crop.current.style.left = e.clientX + 'px';
                }
            }
            ;

            if (clicked.onTopEdge && e.clientY > canvasCords.top) {

                let currentHeight = Math.max(
                    clicked.cy - 3 - e.clientY + clicked.h,
                    minHeight
                );

                if (currentHeight > minHeight) {
                    crop.current.style.height = currentHeight + 'px';
                    crop.current.style.top = e.clientY + 'px';
                }
            }

            return;
        }


        if (clicked && clicked.isMoving) {

            const limit = {
                left: e.clientX < canvasCords.left + clicked.x,
                top: e.clientY < canvasCords.top + clicked.y,
                right: e.clientX > canvasCords.right - (cropCords.width - clicked.x),
                bottom: e.clientY > canvasCords.bottom - (cropCords.height - clicked.y)
            };

            if (limit.bottom && limit.left) {
                crop.current.style.top = canvasCords.bottom - cropCords.height + 'px';
                crop.current.style.left = canvasCords.left + 'px';
            } else if (limit.bottom && limit.right) {
                crop.current.style.left = canvasCords.right - cropCords.width + 'px';
                crop.current.style.top = canvasCords.bottom - cropCords.height + 'px';
            } else if (limit.top && limit.right) {
                crop.current.style.top = canvasCords.top + 'px';
                crop.current.style.left = canvasCords.right - cropCords.width + 'px';
            } else if (limit.top && limit.left) {
                crop.current.style.top = canvasCords.top + 'px';
                crop.current.style.left = canvasCords.left + 'px';
            } else if (limit.left) {
                crop.current.style.top = e.clientY - clicked.y + 'px';
                crop.current.style.left = canvasCords.left + 'px';
            } else if (limit.right) {
                crop.current.style.top = e.clientY - clicked.y + 'px';
                crop.current.style.left = canvasCords.right - cropCords.width + 'px';
            } else if (limit.top) {
                crop.current.style.left = e.clientX - clicked.x + 'px';
                crop.current.style.top = canvasCords.top + 'px';
            } else if (limit.bottom) {
                crop.current.style.left = e.clientX - clicked.x + 'px';
                crop.current.style.top = canvasCords.bottom - cropCords.height + 'px';
            } else {
                crop.current.style.top = e.clientY - clicked.y + 'px';
                crop.current.style.left = e.clientX - clicked.x + 'px';
            }

            return;
        }

        // style cursor
        if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
            crop.current.style.cursor = 'nwse-resize';
        } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
            crop.current.style.cursor = 'nesw-resize';
        } else if (onRightEdge || onLeftEdge) {
            crop.current.style.cursor = 'ew-resize';
        } else if (onBottomEdge || onTopEdge) {
            crop.current.style.cursor = 'ns-resize';
        } else if (canMove(true)) {
            crop.current.style.cursor = 'move';
        } else {
            crop.current.style.cursor = 'default';
        }
    }

    const onUp = (e) => {
        calc(e);
        clicked = null;
    }

    return (
        <>
            <div ref={crop} onMouseDown={onMouseDown} onTouchStart={onTouchDown} id="crop">
                <div className="angles left-middle"/>
                <div className="angles top-middle"/>
                <div className="angles right-middle"/>
                <div className="angles bottom-middle"/>
                <div className="angles left-top"/>
                <div className="angles right-top"/>
                <div className="angles right-bottom"/>
                <div className="angles left-bottom"/>
                {/*<div className='left-border'/>*/}
            </div>
            <Button onClick={handleCropping} className='crop-button' variant="dark">Crop</Button>
        </>
    )
}

Cropper.propTypes = {
    canvasCords: PropTypes.object,
    handleCrop: PropTypes.func
};

export default Cropper;