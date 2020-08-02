export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export const SELECT_PHOTO = 'SELECT_PHOTO';

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

export const SET_ACTIVE_TOOL = 'SET_ACTIVE_TOOL';
export const SET_ACTIVE_SUB_TOOL = 'SET_ACTIVE_SUB_TOOL';

export function setActiveTool(activeTool) {
    return {
        type: SET_ACTIVE_TOOL,
        activeTool
    }
}

export function setActiveSubTool(activeSubTool) {
    return {
        type: SET_ACTIVE_SUB_TOOL,
        activeSubTool
    }
}

export function openSideBar() {
    return {
        type: OPEN_SIDEBAR
    }
}

export function closeSideBar() {
    return {
        type: CLOSE_SIDEBAR
    }
}

export function selectPhoto(url) {
    return {
        type: SELECT_PHOTO,
        url
    }
}

export function requestPhotos(searchString) {
    return {
        type: REQUEST_PHOTOS,
        searchString
    }
}

export function receivePhotos(searchString, response) {
    return {
        type: RECEIVE_PHOTOS,
        searchString,
        photos: response.hits.map(hit => {

            const ratio = hit.previewWidth / hit.previewHeight;

            return {
                src: hit.largeImageURL,
                previewSrc: hit.previewURL,
                height: 150 / ratio
            }
        })
    }
}

export function fetchPhotos(searchString) {
    return dispatch => {
        dispatch(requestPhotos(searchString));
        const url = `https://pixabay.com/api/?key=17649790-b694a99a34bea3bd8ef0e0292&q=${searchString}&per_page=200`;
        return fetch(url)
            .then(res => res.json())
            .then(result => {
                dispatch(receivePhotos(searchString, result));
            })
            .catch(err => console.log(err.message))
    }
}