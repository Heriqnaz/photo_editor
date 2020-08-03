export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

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