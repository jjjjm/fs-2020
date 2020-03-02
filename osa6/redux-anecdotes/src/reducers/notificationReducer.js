const notificationReducer = (state = {message: null, timerId: null}, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION': 
            if(state.timerId){
                window.clearTimeout(state.timerId)
            }
            return {...action.data}
        case 'REMOVE_NOTIFICATION':
            return action.data
        default: 
            return state
    }
}

export const setNotification = (message, timeout) => {
    return async dispatch => {
        const timerId = window.setTimeout(() => dispatch(removeNotification()), timeout)
        dispatch({type: 'SET_NOTIFICATION', data : {message, timerId}})
    }
}

const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: {message:null, timerId: null}
    }
}

export default notificationReducer