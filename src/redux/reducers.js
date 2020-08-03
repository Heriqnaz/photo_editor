import { combineReducers } from 'redux';
import {
    APPLY_IMAGE_CHANGE,
    CLOSE_SIDEBAR,
    OPEN_SIDEBAR,
    RECEIVE_PHOTOS, REDO_IMAGE_CHANGE,
    REQUEST_PHOTOS,
    SELECT_PHOTO,
    SET_ACTIVE_SUB_TOOL,
    SET_ACTIVE_TOOL, UNDO_IMAGE_CHANGE
} from './actions';
import {IS_ERROR} from './actions/photosActions';

const initialPhotoState = {
    selectedPhoto: '',
    isFetchingPhotos: false,
    isError: false,
    photos: [],
    isSearched: false,
    imageHistory: [],
    currentIndex: -1
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
            isError: false,
            photos: action.photos
        };
    case IS_ERROR:
        return {
            ...state,
            isError: true,
        }
    case SELECT_PHOTO:
        return {
            ...state,
            selectedPhoto: action.url,
            imageHistory: [ action.url ],
            currentIndex: 0
        };
    case APPLY_IMAGE_CHANGE:
        return {
            ...state,
            imageHistory: [ ...state.imageHistory.slice(0, state.currentIndex + 1), action.url ],
            currentIndex: state.currentIndex + 1,
            selectedPhoto: action.url
        };
    case REDO_IMAGE_CHANGE:
        return {
            ...state,
            currentIndex: state.currentIndex + 1,
            selectedPhoto: state.imageHistory[state.currentIndex + 1]
        };
    case UNDO_IMAGE_CHANGE:
        return {
            ...state,
            currentIndex: state.currentIndex - 1,
            selectedPhoto: state.imageHistory[state.currentIndex - 1]
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


