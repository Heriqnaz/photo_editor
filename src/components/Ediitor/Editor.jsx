import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ImageContainer from '../ImageContainer/ImageContainer';
import ToolBar from '../ToolBar/ToolBar';

import './Editor.css';

const Editor = ({ selectedPhoto }) => {
    const [ activeTool, setActiveTool ] = useState(null);
    const [ activeSubTool, setActiveSubTool ] = useState(null);
    const [ lineWidth, setLineWidth ] = useState('1');
    const [ lineColor, setLineColor ] = useState('#000000');
    const [ lineStyle, setLineStyle ] = useState('round');

    const handleContentClick = () => {
        const event = new CustomEvent('hideSidebar');
        dispatchEvent(event);
    };

    const handleSetTool = (name) => {
        if (selectedPhoto) {
            if (activeTool === name) {
                setActiveTool(null)
            } else {
                setActiveTool(name)
            }
        }
    };

    const handleSetSubTool = (name) => {
        if (activeSubTool === name) {
            setActiveSubTool(null)
        } else {
            setActiveSubTool(name)
        }
    };

    useEffect(() => {
        setActiveTool(null)
    }, [ selectedPhoto ]);

    return (
        <div className='content' onClick={handleContentClick}>
            <ToolBar
                activeTool={activeTool}
                setActiveTool={handleSetTool}
                activeSubTool={activeSubTool}
                setActiveSubTool={handleSetSubTool}
                setLineWidth={setLineWidth}
                setLineColor={setLineColor}
                setLineStyle={setLineStyle}
                lineStyle={lineStyle}
                lineWidth={lineWidth}
                lineColor={lineColor}
            />
            <ImageContainer
                setActiveTool={setActiveTool}
                activeTool={activeTool}
                selectedPhoto={selectedPhoto}
                lineStyle={lineStyle}
                lineColor={lineColor}
                lineWidth={lineWidth}
            />
        </div>
    )
}

Editor.propTypes = {
    selectedPhoto: PropTypes.string.isRequired
};

export default Editor;