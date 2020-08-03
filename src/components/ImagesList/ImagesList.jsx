import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './ImagesList.css';
import { connect } from 'react-redux';
import { closeSideBar, selectPhoto } from '../../redux/actions';
import Column from './Column';

const ImagesList = ({ photos, isFetching, isSearched, newPhotosLoadCount, firstLoadCount, onPhotoClick, isError }) => {

    const [ photosToShow, setPhotosToShow ] = useState([]);
    const [ isPhotosLoading, setIsPhotosLoading ] = useState(false);

    useEffect(() => {
        setPhotosToShow(photos.slice(0, firstLoadCount));
    }, [ photos, firstLoadCount ]);

    const handleScroll = (e) => {
        if (photos.length === photosToShow.length) {
            return
        }
        if (photos.length - photosToShow.length < newPhotosLoadCount) {
            setIsPhotosLoading(true);
            setTimeout(() => {
                setIsPhotosLoading(false);
                setPhotosToShow(prevPhotos => (
                    [
                        ...prevPhotos,
                        ...photos.slice(prevPhotos.length, prevPhotos.length + (photos.length - photosToShow.length))
                    ]
                ));
            }, 500);
        }
        if (e.target.scrollTop + 1 >= e.target.scrollHeight - e.target.offsetHeight) {
            setIsPhotosLoading(true);
            setTimeout(() => {
                setIsPhotosLoading(false);
                setPhotosToShow(prevPhotos => (
                    [
                        ...prevPhotos,
                        ...photos.slice(prevPhotos.length, prevPhotos.length + newPhotosLoadCount)
                    ]
                ));
            }, 500);
        }
    };

    if (isFetching) {
        return <LoadingIndicator/>
    }
    if (isSearched && !photosToShow.length) {
        return (
            <div className='mt-5 no_res'>
                <svg className="svg-icon" viewBox="0 0 20 20">
                    <path
                        fill="none"
                        d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
								s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z">

                    </path>
                </svg>
                <h2 className='mt-2' style={{ color: 'grey' }}>No result</h2>
            </div>
        )
    }
    if (isSearched && isError) {
        return (
            <div className='mt-5 no_res'>
                <svg className="svg-icon" viewBox="0 0 20 20">
                    <path
                        d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                </svg>
                <h2 className='mt-2' style={{ color: 'grey' }}>No result</h2>
            </div>
        )
    }
    return (
        <div
            onScroll={handleScroll}
            className='images_container'>
            {
                <div className='image-list-columns'>
                    <Column data={photosToShow.slice(0, photosToShow.length / 2)}/>
                    <Column data={photosToShow.slice(photosToShow.length / 2)}/>
                </div>
            }
            {
                isPhotosLoading && <LoadingIndicator/>
            }
        </div>
    )
};

ImagesList.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired,
    isSearched: PropTypes.bool.isRequired,
    newPhotosLoadCount: PropTypes.number.isRequired,
    firstLoadCount: PropTypes.number.isRequired,
    onPhotoClick: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    photos: state.photo.photos,
    isFetching: state.photo.isFetchingPhotos,
    isSearched: state.photo.isSearched,
    isError: state.photo.isError
});

const mapDispatchToProps = (dispatch) => ({
    onPhotoClick: (url) => {
        dispatch(selectPhoto(url));
        dispatch(closeSideBar());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);