import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeSideBar, selectPhoto, setActiveTool } from '../../redux/actions';

import loader from '../../assets/svgs/tail-spin.svg';

import './SearchedImage.css';

const SearchedImage = ({ photo, onPhotoClick }) => {

    const [height, setHeight] = useState();
    const [src, setSrc] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setHeight(photo.height);
        const img = new Image();
        img.src = photo.src;
        img.onload = () => {
            setSrc(photo.previewSrc);
            setLoading(false)
        }

    }, []);

    const Loader = () => {
        return (
            <img style={{ width: '50px' }} src={loader} alt="loading"/>
        );
    };

    return (
        <div className='search-img-container' style={{ height }}>
            {isLoading ? <Loader/> :
                <img onClick={() => onPhotoClick(photo.src)} style={{ width: '100%' }} src={src} alt=""/>}
        </div>
    )
};

SearchedImage.propTypes = {
    photo: PropTypes.object.isRequired,
    onPhotoClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    onPhotoClick: (url) => {
        dispatch(selectPhoto(url));
        dispatch(closeSideBar());
        dispatch(setActiveTool(null));
    }
});

export default connect(null, mapDispatchToProps)(SearchedImage);