export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export const SELECT_PHOTO = 'SELECT_PHOTO';
export const IS_ERROR = 'IS_ERROR';

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

export function isError() {
    return {
        type: IS_ERROR
    }
}

export function fetchPhotos(searchString) {
    return dispatch => {
        dispatch(requestPhotos(searchString));
        const url = `https://pixabay.com/api/?key=17649790-b694a99a34bea3bd8ef0e0292&q=${searchString}&per_page=200`;
        return fetch(url)
            .then(res => res.json())
            .then(result => dispatch(receivePhotos(searchString, result)))
            .catch(err => dispatch(isError()))
    }
}