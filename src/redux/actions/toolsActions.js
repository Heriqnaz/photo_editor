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