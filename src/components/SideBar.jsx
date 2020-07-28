import React, {useEffect, useState} from 'react';
import '../css/sidebar.css'
import {Nav} from 'react-bootstrap';
import {Download, Image, Upload} from 'react-bootstrap-icons';
import GoogleSearchPanel from '../containers/GoogleSearchPanel/GoogleSearchPanel.jsx';

const SideBar = () => {
    const [ isRightMenuOpen, setOpenMenu ] = useState(false);

    const handleClick = () => {
        setOpenMenu(!isRightMenuOpen)
    };

    const handleHide = () => {
        setOpenMenu(false)
    };

    useEffect(() => {
        window.addEventListener('hideSidebar', handleHide);
        return () => {
            window.removeEventListener('hideSidebar', handleHide);
        }
    });

    return (
        <Nav className="sidebar">
            <div className="menu-left-part" style={{marginLeft: isRightMenuOpen ? '0' : '-30vw'}}>
                <GoogleSearchPanel/>
            </div>
            <div className='menu-right-part'>
                <Nav.Link className="sidebar-nav-item">
                    <Upload color='#999' size={29}/>
                    <p>Upload</p>
                </Nav.Link>
                <Nav.Link
                    className={`sidebar-nav-item ${isRightMenuOpen && 'open'}`}
                    onClick={handleClick}>
                    <Image color='#999' size={29}/>
                    <p>Search</p>
                </Nav.Link>
                <Nav.Link className="sidebar-nav-item">
                    <Download color='#999' size={29}/>
                    <p>Download</p>
                </Nav.Link>
            </div>
        </Nav>
    )
};

export default SideBar;