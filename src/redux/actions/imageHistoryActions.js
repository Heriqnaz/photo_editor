export const APPLY_IMAGE_CHANGE = 'DRAW_IMAGE';
export const UNDO_IMAGE_CHANGE = 'UNDO_IMAGE_CHANGE';
export const REDO_IMAGE_CHANGE = 'REDO_IMAGE_CHANGE';

export function applyImageChange(imgUrl) {
    return {
        type: APPLY_IMAGE_CHANGE,
        url: imgUrl
    }
}

export function undoImageChange() {
    return {
        type: UNDO_IMAGE_CHANGE
    }
}

export function redoImageChange() {
    return {
        type: REDO_IMAGE_CHANGE
    }
}