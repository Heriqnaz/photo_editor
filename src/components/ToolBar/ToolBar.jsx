import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ToolBar.css';
import {setActiveTool, setActiveSubTool, undoImageChange, redoImageChange} from '../../redux/actions';
import { connect } from 'react-redux';

const ToolBar = ({ activeTool, activeSubTool, selectedPhoto, setActiveTool, setActiveSubTool, undoImageChange, redoImageChange, canUndoChange, canRedoChange }) => {

    useEffect(() => {
        if (activeTool !== 'draw') {
            setActiveTool(null)
        }
    }, [ selectedPhoto ]);

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
                <button className='undo_redo_btn' disabled={!canUndoChange} onClick={undoImageChange}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                        <path
                            d={`M3.24,7.51c-0.146,0.142-0.146,
                                0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,
                                0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,
                                0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,
                                1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,
                                0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,
                                0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,
                                7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,
                                0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,
                                6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,
                                0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,
                                9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z`} />
                    </svg>
                </button>
                <button className='undo_redo_btn' disabled={!canRedoChange} onClick={redoImageChange}>
                    <svg className="svg-icon" viewBox="0 0 20 20">
                        <path
                            d={`M16.76,7.51l-5.199-5.196c-0.234-0.239-0.633-0.066-0.633,
                                0.261v2.534c-0.267-0.035-0.575-0.063-0.881-0.063c-3.813,
                                0-6.915,3.042-6.915,6.783c0,2.516,1.394,
                                4.729,3.729,5.924c0.367,0.189,
                                0.71-0.266,0.451-0.572c-0.678-0.793-1.008-1.645-1.008-2.602c0-2.348,
                                1.93-4.258,4.303-4.258c0.108,0,0.215,0.003,0.321,0.011v2.634c0,
                                0.326,0.398,0.5,0.633,0.262l5.199-5.193C16.906,7.891,16.906,
                                7.652,16.76,7.51 M11.672,
                                12.068V9.995c0-0.185-0.137-0.341-0.318-0.367c-0.219-0.032-0.49-0.05-0.747-0.05c-2.78,
                                0-5.046,2.241-5.046,5c0,0.557,0.099,1.092,0.292,
                                1.602c-1.261-1.111-1.979-2.656-1.979-4.352c0-3.331,2.77-6.041,
                                6.172-6.041c0.438,0,0.886,0.067,1.184,0.123c0.231,0.043,0.441-0.134,
                                0.441-0.366V3.472l4.301,4.3L11.672,12.068z`} />
                    </svg>
                </button>
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