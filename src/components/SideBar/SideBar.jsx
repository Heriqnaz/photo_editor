import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import { Nav } from 'react-bootstrap';
import { Download, Image, Upload } from 'react-bootstrap-icons';
import GoogleSearchPanel from '../../containers/GoogleSearchPanel/GoogleSearchPanel.jsx';
import PropTypes from 'prop-types';

const SideBar = ({ onPhotoSelect }) => {
    const [ isRightMenuOpen, setOpenMenu ] = useState(false);

    const handleClick = () => {
        setOpenMenu(!isRightMenuOpen)
    };

    const handleHide = () => {
        setOpenMenu(false)
        setOpenMenu(false)
    };

    const onFileChange = (e) => {
        if (e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            onPhotoSelect(url);
        }
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
                <GoogleSearchPanel handleHide={handleHide}/>
            </div>
            <div className='menu-right-part'>
                <form>
                    <label htmlFor="imgInput" className='sidebar-nav-item' style={{cursor: 'pointer'}}>
                        <Upload color='#999' size={29}/>
                        <p>Upload</p>
                        <input
                            type="file"
                            name='imgInput'
                            id="imgInput"
                            accept='image/*'
                            onChange={onFileChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </form>
                <Nav.Link
                    className={`sidebar-nav-item ${isRightMenuOpen && 'open'}`}
                    onClick={handleClick}
                >
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

SideBar.propTypes = {
    onPhotoSelect: PropTypes.func.isRequired
};

export default SideBar;