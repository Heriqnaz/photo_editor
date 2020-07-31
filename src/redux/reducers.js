import { combineReducers } from 'redux';
import {
    REQUEST_PHOTOS,
    RECEIVE_PHOTOS,
    SELECT_PHOTO
} from './actions';

function selectedPhoto(state = '', action) {
    switch (action.type) {
    case SELECT_PHOTO:
        return action.url;
    case REQUEST_PHOTOS:
        return '';
    default:
        return state;
    }
}

function isFetchingPhotos(state = false, action) {
    switch (action.type) {
    case REQUEST_PHOTOS:
        return true;
    case RECEIVE_PHOTOS:
        return false;
    default:
        return state;
    }
}

function photos(state = [], action) {
    switch (action.type) {
    case RECEIVE_PHOTOS:
        return action.photos;
    default:
        return state;
    }
}

function isSearched(state = false, action) {
    switch (action.type) {
    case REQUEST_PHOTOS:
        return state ? state : true;
    default:
        return state;
    }
}

export default combineReducers({
    selectedPhoto,
    isFetchingPhotos,
    photos,
    isSearched
});


