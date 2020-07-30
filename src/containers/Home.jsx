import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../components/SideBar/SideBar';
import Editor from '../components/Ediitor/Editor';
import {selectPhoto} from '../redux/actions';

const Home = ({onPhotoSelect, selectedPhoto}) => {
    return (
        <div className='wrapper-box'>
            <div className="wrapper">
                <SideBar onPhotoSelect={onPhotoSelect} />
                <Editor selectedPhoto={selectedPhoto}/>
            </div>
        </div>
    )
}

Home.propTypes = {
    onPhotoSelect: PropTypes.func.isRequired,
    selectedPhoto: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    selectedPhoto: state.selectedPhoto
});

const mapDispatchToProps = (dispatch) => ({
    onPhotoSelect: (url) => {
        dispatch(selectPhoto(url));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);