import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ImagesList from '../../components/ImagesList/ImagesList';
import {fetchPhotos, selectPhoto} from '../../redux/actions';
import './GoogleSearchPanel.css';

const GoogleSearchPanel = ({onSearch, onPhotoSelect, photos, isFetchingPhotos, selectedPhoto, isSearched}) => (
    <div className='d-flex'>
        <div className='search_panel_container pt-3'>
            <SearchPanel
                onSearch={onSearch}
            />
            <ImagesList
                photos={photos}
                isFetching={isFetchingPhotos}
                isSearched={isSearched}
                selectedPhoto={selectedPhoto}
                onPhotoSelect={onPhotoSelect}
                newPhotosLoadCount={19}
                firstLoadCount={20}
            />
        </div>
    </div>
);

GoogleSearchPanel.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onPhotoSelect: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired),
    isFetchingPhotos: PropTypes.bool.isRequired,
    selectedPhoto: PropTypes.string.isRequired,
    isSearched: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    photos: state.photos,
    isFetchingPhotos: state.isFetchingPhotos,
    selectedPhoto: state.selectedPhoto,
    isSearched: state.isSearched
});

const mapDispatchToProps = (dispatch) => ({
    onPhotoSelect: (url) => {
        dispatch(selectPhoto(url));
    },
    onSearch: (searchString) => {
        dispatch(fetchPhotos(searchString));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSearchPanel);