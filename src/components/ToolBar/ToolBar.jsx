import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ToolBar.css';
import { setActiveTool, setActiveSubTool, undoImageChange, redoImageChange } from '../../redux/actions';
import { connect } from 'react-redux';

const ToolBar = ({ activeTool, activeSubTool, selectedPhoto, setActiveTool, setActiveSubTool, undoImageChange, redoImageChange, canUndoChange, canRedoChange }) => {

    useEffect(() => {
        if (activeTool !== 'draw') {
            setActiveTool(null)
        }
    }, [selectedPhoto]);

    const handleSetTool = (name) => {
        if (selectedPhoto) {
            setActiveTool(name)
        }
    };

    const tools = [
        { name: 'filter', title: 'Filter' },
        { name: 'frame', title: 'Frame' },
        { name: 'stickers', title: 'Stickers' },
        { name: 'crop', title: 'Crop' },
        { name: 'draw', title: 'Draw' }
    ];

    const subTools = {
        filter: [
            { name: 'filter-blur', title: 'Blur' },
            { name: 'filter-brightness', title: 'Brightness' },
            { name: 'filter-grayscale', title: 'Grayscale' },
        ],
        frame: [
            { name: 'birthday', title: 'Birthday' },
            { name: 'love', title: 'Love' },
            { name: 'party-time', title: 'Party Time' }
        ],
        stickers: [
            { name: 'flower', title: 'Flower' },
            { name: 'butterfly', title: 'Butterfly' },
            { name: 'tree', title: 'Tree' }
        ]
    };
    return (
        <div className='tool-bar'>


            <div>
                <ul className='tools'>
                    {
                        tools.map((tool, i) => (
                            <li
                                onClick={() => handleSetTool(tool.name)} key={i}
                                className={activeTool === tool.name ? 'tool-active' : ''}>
                                {tool.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='undo_redo_cont'>
                <div className='undo_redo_btn_cont'>
                    <button className='undo_btn' disabled={!canUndoChange} onClick={undoImageChange}/>
                </div>
                <div className='undo_redo_btn_cont'>
                    <button className='redo_btn' disabled={!canRedoChange} onClick={redoImageChange}/>
                </div>
            </div>
            {
                subTools[activeTool] &&
                <ul className='sub-tools'>
                    {
                        subTools[activeTool].map((subTool, i) => (
                            <li
                                onClick={() => setActiveSubTool(subTool.name)}
                                className={activeSubTool === subTool.name ? 'tool-active' : ''} key={i}>
                                {subTool.title}
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
};

ToolBar.propTypes = {
    activeTool: PropTypes.string,
    activeSubTool: PropTypes.string,
    setActiveTool: PropTypes.func,
    setActiveSubTool: PropTypes.func,
    selectedPhoto: PropTypes.string,
    undoImageChange: PropTypes.func,
    redoImageChange: PropTypes.func,
    canUndoChange: PropTypes.bool,
    canRedoChange: PropTypes.bool
};

const mapStateToProps = (state) => ({
    selectedPhoto: state.photo.selectedPhoto,
    activeTool: state.tool.activeTool,
    activeSubTool: state.tool.activeSubTool,
    canUndoChange: state.photo.currentIndex > 0,
    canRedoChange: state.photo.currentIndex < state.photo.imageHistory.length - 1
});

const mapDispatchToProps = (dispatch) => ({
    setActiveTool: tool => dispatch(setActiveTool(tool)),
    setActiveSubTool: tool => dispatch(setActiveSubTool(tool)),
    undoImageChange: () => dispatch(undoImageChange()),
    redoImageChange: () => dispatch(redoImageChange())
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);