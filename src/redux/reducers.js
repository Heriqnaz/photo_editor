import { combineReducers } from 'redux';
import {
    CLOSE_SIDEBAR,
    OPEN_SIDEBAR,
    RECEIVE_PHOTOS,
    REQUEST_PHOTOS,
    SELECT_PHOTO,
    SET_ACTIVE_SUB_TOOL,
    SET_ACTIVE_TOOL
} from './actions';

const initialPhotoState = {
    selectedPhoto: '',
    isFetchingPhotos: false,
    photos: [],
    isSearched: false,
};

const initialToolState = {
    activeTool: null,
    activeSubTool: null
};

function tool(state = initialToolState, action) {
    switch (action.type) {
        case SET_ACTIVE_TOOL:
            const activeTool = state.activeTool === action.activeTool ? null : action.activeTool;
            return {
                ...state,
                activeTool
            };
        case SET_ACTIVE_SUB_TOOL:
            const activeSubTool = state.activeTool === action.activeSubTool ? null : action.activeSubTool;
            return {
                ...state,
                activeSubTool
            };
        default:
            return state
    }
}

function photo(state = initialPhotoState, action) {
    switch (action.type) {
        case REQUEST_PHOTOS:
            return {
                ...state,
                isFetchingPhotos: true,
                selectedPhoto: '',
                isSearched: state.isSearched ? state.isSearched : true
            };
        case RECEIVE_PHOTOS:
            return {
                ...state,
                isFetchingPhotos: false,
                photos: action.photos
            };
        case SELECT_PHOTO:
            return {
                ...state,
                selectedPhoto: action.url
            };
        default:
            return state
    }
}

// function selectedPhoto(state = '', action) {
//     switch (action.type) {
//         case SELECT_PHOTO:
//             return action.url;
//         case REQUEST_PHOTOS:
//             return '';
//         default:
//             return state;
//     }
// }

// function isFetchingPhotos(state = false, action) {
//     switch (action.type) {
//         case REQUEST_PHOTOS:
//             return true;
//         case RECEIVE_PHOTOS:
//             return false;
//         default:
//             return state;
//     }
// }

// function photos(state = [], action) {
//     switch (action.type) {
//         case RECEIVE_PHOTOS:
//             return action.photos;
//         default:
//             return state;
//     }
// }
//
// function isSearched(state = false, action) {
//     switch (action.type) {
//         case REQUEST_PHOTOS:
//             return state ? state : true;
//         default:
//             return state;
//     }
// }


function isOpenedSideBar(state = false, action) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return true;
        case CLOSE_SIDEBAR:
            return false;
        default:
            return state;
    }
}


export default combineReducers({
    // selectedPhoto,
    // // isFetchingPhotos,
    // photos,
    // isSearched,
    photo,
    isOpenedSideBar,
    tool
});


