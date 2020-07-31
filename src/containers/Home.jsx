import React from 'react';

import SideBar from '../components/SideBar/SideBar';
import Editor from '../components/Editor/Editor';

import './Home.css'

const Home = () => {
    return (
        <div className='wrapper-box'>
            <div className="wrapper">
                <SideBar/>
                <Editor/>
            </div>
        </div>
    )
};

export default Home;