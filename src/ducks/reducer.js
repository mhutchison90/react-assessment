import axios from 'axios';

const initialState = {
    taskList: [],
    newTask:'',
    task:{}
}

// --ACTION CONSTRAINTS--
const GET_TASK_LIST = 'GET_TASK_LIST';
const ADD_NEW_TASK = 'ADD_NEW_TASK';
const DELETE_TASK = 'DELETE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const ONE_TASK = 'ONE_TASK';
const PATCH_TASK = 'PATCH_TASK';

// --ACTION CREATORS--
export function getTaskList() {
    const taskListData = axios.get('https://practiceapi.devmountain.com/api/tasks').then(res => {
        return res.data
    })
    return {
        type: GET_TASK_LIST,
        payload: taskListData
    }
}
export function postNewTask(body) {
    const newTaskData = axios.post('https://practiceapi.devmountain.com/api/tasks',body).then(res => {
        return res.data
    })
    return {
        type: ADD_NEW_TASK,
        payload: newTaskData
    }
}
export function deleteTask(id) {
    const deletingTask = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(res => {
        return res.data
    })
    return {
        type: DELETE_TASK,
        payload: deletingTask
    }
}
export function completeTask(id) {
    const completedTask = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(res => {
        return res.data
    })
    return {
        type: COMPLETE_TASK,
        payload: completedTask
    }
}
export function setTaskOnRedux(val) {
    return {
        type: ONE_TASK,
        payload: val
    }
}
export function patchTask(id,body) {
    const updatedTaskData = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`,body).then(res => {
        return res.data
    })
    return {
        type: PATCH_TASK,
        payload: updatedTaskData
    }
}

// --REDUCER--
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASK_LIST + '_FULFILLED':
            return Object.assign({}, state, { taskList: action.payload });
        case ADD_NEW_TASK + '_FULFILLED':
            return Object.assign({}, state, { taskList: action.payload });
        case DELETE_TASK + '_FULFILLED':
            return Object.assign({}, state, { taskList: action.payload });
        case COMPLETE_TASK + '_FULFILLED':
            return Object.assign({}, state, { taskList: action.payload });
        case ONE_TASK:
            return Object.assign({}, state, { task: action.payload });
        case PATCH_TASK:
            return Object.assign({}, state, { taskList: action.payload });

        default:
            return state;
    }
}
