import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import GoogleSearchPanel from '../../containers/GoogleSearchPanel/GoogleSearchPanel.jsx';
import { Download, Image, Upload } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import { closeSideBar, openSideBar, selectPhoto } from '../../redux/actions';

import './Sidebar.css'

const SideBar = ({ onPhotoSelect, isOpenedSideBar, openSideBar, closeSideBar, selectedPhoto }) => {

    const handleToggleClick = () => {
        if (isOpenedSideBar) {
            closeSideBar()
        } else {
            openSideBar()
        }
    };

    const onFileChange = (e) => {
        if (e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            onPhotoSelect(url);
            closeSideBar();
        }
    };


    return (
        <>
            <Nav className="sidebar">
                <div className="menu-left-part" style={{ marginLeft: isOpenedSideBar ? '0' : '-30vw' }}>
                    <GoogleSearchPanel handleHide={closeSideBar}/>
                </div>
                <div className='menu-right-part back-opened'>
                    <form>
                        <label htmlFor="imgInput" className='sidebar-nav-item'>
                            <Upload color='#999' size={29}/>
                            <p>Upload</p>
                            <input
                                type="file"
                                name='imgInput'
                                id="imgInput"
                                accept='image/*'
                                onChange={onFileChange}
                                hidden
                            />
                        </label>
                    </form>
                    <Nav.Link
                        className={`sidebar-nav-item ${isOpenedSideBar && 'open'}`}
                        onClick={handleToggleClick}
                    >
                        <Image color='#999' size={29}/>
                        <p>Search</p>
                    </Nav.Link>
                    <a href={selectedPhoto} download className='sidebar-nav-item'>
                        <Download color='#999' size={29}/>
                        <p>Download</p>
                    </a>
                </div>
            </Nav>
            <div onClick={closeSideBar} className={`sidebar-back ${isOpenedSideBar && 'visible'}`}/>
        </>
    )
};

SideBar.propTypes = {
    onPhotoSelect: PropTypes.func.isRequired,
    isOpenedSideBar: PropTypes.bool.isRequired,
    openSideBar: PropTypes.func.isRequired,
    closeSideBar: PropTypes.func.isRequired,
    selectedPhoto: PropTypes.string
};

const mapStateToProps = (state) => ({
    isOpenedSideBar: state.isOpenedSideBar,
    selectedPhoto: state.photo.selectedPhoto
});

const mapDispatchToProps = (dispatch) => ({
    onPhotoSelect: (url) => dispatch(selectPhoto(url)),
    closeSideBar: () => dispatch(closeSideBar()),
    openSideBar: () => dispatch(openSideBar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);