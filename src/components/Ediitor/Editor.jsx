import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ImageContainer from '../ImageContainer/ImageContainer';
import ToolBar from '../ToolBar/ToolBar';

import './Editor.css';

const Editor = ({ selectedPhoto }) => {


    const [activeTool, setActiveTool] = useState(null);
    const [activeSubTool, setActiveSubTool] = useState(null);

    const handleContentClick = () => {
        const event = new CustomEvent('hideSidebar');
        dispatchEvent(event);
    };

    useEffect(() => {
        setActiveTool(null)
    }, [selectedPhoto])

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

    console.log(selectedPhoto);

    return (
        <div className='content' onClick={handleContentClick}>
            <ToolBar
                activeTool={activeTool}
                setActiveTool={handleSetTool}
                activeSubTool={activeSubTool}
                setActiveSubTool={handleSetSubTool}
            />
            <ImageContainer setActiveTool={setActiveTool} activeTool={activeTool} selectedPhoto={selectedPhoto}/>
        </div>
    )
}

Editor.propTypes = {
    selectedPhoto: PropTypes.string.isRequired
};

export default Editor;