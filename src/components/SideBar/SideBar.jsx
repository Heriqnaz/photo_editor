import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeSideBar, openSideBar, selectPhoto, setActiveTool } from '../../redux/actions';

import GoogleSearchPanel from '../../containers/GoogleSearchPanel/GoogleSearchPanel.jsx';

import './Sidebar.css';

const SideBar = ({ onPhotoSelect, isOpenedSideBar,setActiveTool, openSideBar, closeSideBar, selectedPhoto }) => {

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
            <div className="sidebar">
                <div className="menu-left-part" style={{ marginLeft: isOpenedSideBar ? '0' : '-30vw' }}>
                    <GoogleSearchPanel handleHide={closeSideBar}/>
                </div>
                <div className='menu-right-part back-opened'>
                    <form>
                        <label htmlFor="imgInput" className='sidebar-nav-item'>
                            <div className='sidebar-icons upload'/>
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
                    <div className={`sidebar-nav-item ${isOpenedSideBar && 'open'}`} onClick={handleToggleClick}>
                        <div className='sidebar-icons search'/>
                        <p>Search</p>
                    </div>
                    <a href={selectedPhoto} download
                       style={{ pointerEvents: !selectedPhoto && 'none', cursor: !selectedPhoto && 'default' }}
                       className='sidebar-nav-item'>
                        <div className='sidebar-icons download'/>
                        <p>Download</p>
                    </a>
                </div>
            </div>
            <div onClick={closeSideBar} className={`sidebar-back ${isOpenedSideBar && 'visible'}`}/>
        </>
    )
};

SideBar.propTypes = {
    onPhotoSelect: PropTypes.func.isRequired,
    isOpenedSideBar: PropTypes.bool.isRequired,
    openSideBar: PropTypes.func.isRequired,
    closeSideBar: PropTypes.func.isRequired,
    selectedPhoto: PropTypes.string,
    setActiveTool: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isOpenedSideBar: state.isOpenedSideBar,
    selectedPhoto: state.photo.selectedPhoto
});

const mapDispatchToProps = (dispatch) => ({
    onPhotoSelect: (url) => {
        dispatch(selectPhoto(url))
        dispatch(setActiveTool(null))
    },
    closeSideBar: () => dispatch(closeSideBar()),
    openSideBar: () => dispatch(openSideBar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);