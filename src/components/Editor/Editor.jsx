import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ImageContainer from '../ImageContainer/ImageContainer';
import ToolBar from '../ToolBar/ToolBar';

import './Editor.css';
import { connect } from 'react-redux';

const Editor = ({ selectedPhoto }) => {

    const [ activeTool, setActiveTool ] = useState(null);
    const [ activeSubTool, setActiveSubTool ] = useState(null);

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
        <div className='content'>
            <ToolBar
                activeTool={activeTool}
                setActiveTool={handleSetTool}
                activeSubTool={activeSubTool}
                setActiveSubTool={handleSetSubTool}
            />
            <ImageContainer
                setActiveTool={setActiveTool}
                activeTool={activeTool}
                selectedPhoto={selectedPhoto}
                activeSubTool={activeSubTool}
            />
        </div>
    )
};

Editor.propTypes = {
    selectedPhoto: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    selectedPhoto: state.photo.selectedPhoto
});

export default connect(mapStateToProps)(Editor);