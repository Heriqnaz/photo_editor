import React from 'react';
import SideBar from './SideBar';
import {Content} from './Content';

export function Home() {
    return (
        <div className='wrapper-box'>
            <div className="wrapper">
                <SideBar/>
                <Content/>
            </div>
        </div>
    )
}
