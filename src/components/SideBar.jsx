import React, {useEffect, useState} from 'react';
import '../css/sidebar.css'
import {Card, CardColumns, Nav} from 'react-bootstrap';
import {Download, Image, Search, Upload} from 'react-bootstrap-icons';
import '../css/sidebar.css';
import GoogleSearchPanel from "../containers/GoogleSearchPanel/GoogleSearchPanel.jsx";


function SideBar() {
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
            <div className="menu-left-part" style={{marginLeft: (isRightMenuOpen) ? '0' : '-505px'}}>
                <GoogleSearchPanel />

            </div>
            <div className='menu-right-part'>
                <Nav.Link className="sidebar-nav-item">
                    <Upload color='#999' size={29}/>
                    <p>Uploads</p>
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
}

export default SideBar;