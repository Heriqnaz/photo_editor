import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Content.css';
import ToolBar from '../ToolBar/ToolBar';

const Content = ({ selectedPhoto }) => {

    const [activeTool, setActiveTool] = useState(null);
    const [activeSubTool, setActiveSubTool] = useState(null)

    const handleContentClick = () => {
        const event = new CustomEvent('hideSidebar');
        dispatchEvent(event);
    };

    const handleSetTool = (name) => {
        if (activeTool === name) {
            setActiveTool(null)
        } else {
            setActiveTool(name)
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
                activeSubTool={activeSubTool}
                setActiveSubTool={handleSetSubTool}
                setActiveTool={handleSetTool}/>
            <div className="img-box">
                <div className='edit-img'>
                    {
                        selectedPhoto &&
                        <img src={selectedPhoto} style={{ width: '100%', height: '100%' }} alt='Not found'/>
                    }
                </div>
            </div>
        </div>
    )
}

Content.propTypes = {
    selectedPhoto: PropTypes.string.isRequired
};

export default Content;