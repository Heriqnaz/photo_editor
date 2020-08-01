import React from 'react';
import PropTypes from 'prop-types';
import './ToolBar.css';

const ToolBar = ({activeTool, activeSubTool, setActiveTool, setActiveSubTool}) => {

    const tools = [
        {name: 'filter', title: 'Filter'},
        {name: 'frame', title: 'Frame'},
        {name: 'stickers', title: 'Stickers'},
        {name: 'crop', title: 'Crop'},
        {name: 'draw', title: 'Draw'}
    ];

    const subTools = {
        filter: [
            {name: 'filter-blur', title: 'Blur'},
            {name: 'filter-brightness', title: 'Brightness'},
            {name: 'filter-grayscale', title: 'Grayscale'},
        ],
        frame: [
            {name: 'birthday', title: 'Birthday'},
            {name: 'love', title: 'Love'},
            {name: 'party time', title: 'Party Time'}
        ],
        stickers: [
            {name: 'flower', title: 'Flower'},
            {name: 'butterfly', title: 'Butterfly'},
            {name: 'tree', title: 'Tree'}
        ]
    };

    return (
        <div className='tool-bar'>
            <ul className='tools'>
                {
                    tools.map((tool, i) => (
                        <li
                            onClick={() => setActiveTool(tool.name)} key={i}
                            className={activeTool === tool.name ? 'tool-active' : ''}>
                            {tool.title}
                        </li>
                    ))
                }
            </ul>
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
};

export default ToolBar;