import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { Card, CardColumns } from 'react-bootstrap';
import './ImagesList.css';
import { connect } from 'react-redux';
import { closeSideBar, selectPhoto } from '../../redux/actions';
import SearchedImage from "../SearchedImage/SearchedImage";

const ImagesList = ({ photos, isFetching, isSearched, newPhotosLoadCount, firstLoadCount, onPhotoClick }) => {

    const [photosToShow, setPhotosToShow] = useState([]);
    const [isPhotosLoading, setIsPhotosLoading] = useState(false);

    useEffect(() => {
        setPhotosToShow(photos.slice(0, firstLoadCount));
    }, [photos, firstLoadCount]);

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
    return (
        <div
            onScroll={handleScroll}
            className='images_container'>
            {
                <CardColumns className='google-photo'>
                    {photosToShow.map((photo, index) => {

                        console.log(photo)

                        return <Card key={index}>
                            <Card.Img
                                onClick={() => onPhotoClick(photo.src)}
                                src={photo.previewSrc}
                                alt='Not Found'
                                variant="top"
                            />
                            {/*<SearchedImage photo={photo}/>*/}
                        </Card>
                    })}
                </CardColumns>
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
    onPhotoClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    photos: state.photo.photos,
    isFetching: state.photo.isFetchingPhotos,
    isSearched: state.photo.isSearched
});

const mapDispatchToProps = (dispatch) => ({
    onPhotoClick: (url) => {
        dispatch(selectPhoto(url));
        dispatch(closeSideBar());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);