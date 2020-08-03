import React from 'react';

import ImageContainer from '../ImageContainer/ImageContainer';
import ToolBar from '../ToolBar/ToolBar';

import './Editor.css';

const Editor = () => {

    return (
        <div className='content'>
            <ToolBar/>
            <ImageContainer/>
        </div>
    )
};


export default Editor;