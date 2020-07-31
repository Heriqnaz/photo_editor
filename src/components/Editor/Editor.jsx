import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ImageContainer from '../ImageContainer/ImageContainer';
import ToolBar from '../ToolBar/ToolBar';

import './Editor.css';
import { connect } from 'react-redux';

const Editor = ({ selectedPhoto }) => {

    const [ activeTool, setActiveTool ] = useState(null);
    const [ activeSubTool, setActiveSubTool ] = useState(null);
    const [ lineWidth, setLineWidth ] = useState('1');
    const [ lineColor, setLineColor ] = useState('#000000');
    const [ lineStyle, setLineStyle ] = useState('round');

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
    }, [selectedPhoto]);

    return (
        <div className='content'>
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

const mapStateToProps = (state) => ({
    selectedPhoto: state.photo.selectedPhoto
});

export default connect(mapStateToProps)(Editor);