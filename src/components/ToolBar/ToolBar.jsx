import React from 'react';
import PropTypes from 'prop-types';
import './ToolBar.css';

const ToolBar = (
    {
        activeTool,
        activeSubTool,
        setActiveTool,
        setActiveSubTool,
        setLineColor,
        setLineWidth,
        setLineStyle,
        lineStyle,
        lineWidth,
        lineColor
    }) => {

    const tools = [
        { name: 'effects', title: 'Effects' },
        { name: 'frame', title: 'Frame' },
        { name: 'stickers', title: 'Stickers' },
        { name: 'crop', title: 'Crop' },
        { name: 'draw', title: 'Draw'}
    ];

    const subTools = {
        effects: [
            { name: 'blur', title: 'Blur' },
            { name: 'magic', title: 'Magic' },
            { name: 'pop art', title: 'Pop Art' }
        ],
        frame: [
            { name: 'birthday', title: 'Birthday' },
            { name: 'love', title: 'Love' },
            { name: 'party time', title: 'Party Time' }
        ],
        stickers: [
            { name: 'flower', title: 'Flower' },
            { name: 'butterfly', title: 'Butterfly' },
            { name: 'tree', title: 'Tree' }
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
            {
                activeTool === 'draw' ? (
                    <ul className='sub-tools sub-tools-drawing'>
                        <li className='line-cap'>
                            Line style:
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="lineStyle"
                                    id="lineStyle1"
                                    value="round"
                                    onChange={e => setLineStyle(e.target.value)}
                                    checked={lineStyle === 'round'}
                                />
                                <label className="form-check-label" htmlFor="lineStyle1">
                                        Round
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="lineStyle"
                                    id="lineStyle2"
                                    value="square"
                                    onChange={e => setLineStyle(e.target.value)}
                                    checked={lineStyle === 'square'}
                                />
                                <label className="form-check-label" htmlFor="lineStyle2">
                                        Square
                                </label>
                            </div>
                        </li>
                        <li className='line-thickness'>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Line Thickness: {lineWidth}</label>
                                <input
                                    type="range"
                                    value={lineWidth}
                                    onChange={e => setLineWidth(e.target.value)}
                                    max={20}
                                    step={0.1}
                                    min={0.1}
                                    className="form-control-range bg-dark text-dark"
                                    id="formControlRange" />
                            </div>
                        </li>
                        <li className='line-color'>
                            <div className="form-group">
                                <label htmlFor="color">Color: </label>
                                <input
                                    type="color"
                                    className="form-control"
                                    value={lineColor}
                                    onChange={e => setLineColor(e.target.value)}
                                    id="color" />
                            </div>
                        </li>
                    </ul>
                ) : null
            }
        </div>
    )
}

ToolBar.propTypes = {
    activeTool: PropTypes.string,
    activeSubTool: PropTypes.string,
    setActiveTool: PropTypes.func,
    setActiveSubTool: PropTypes.func,
    setLineWidth: PropTypes.func.isRequired,
    setLineColor: PropTypes.func.isRequired,
    setLineStyle: PropTypes.func.isRequired,
    lineStyle: PropTypes.string.isRequired,
    lineWidth: PropTypes.string.isRequired,
    lineColor: PropTypes.string.isRequired
};

export default ToolBar;