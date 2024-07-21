import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { GET_MESSAGES, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS, ADD_MESSAGE, ADD_MESSAGE_FAILURE, ADD_MESSAGE_SUCCESS, SET_CURRENT_CONVERSATION, SET_ARRIVAL_MESSAGE, SET_TYPERS } from "../actionTypes"

export const getMessages = (id) => async (dispatch) => {
    dispatch({ type: GET_MESSAGES })
    const url = `message/${id}`
    const Data = await callApi(url, 'GET', '', true);
    if (Data?.status === 200) {
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: Data?.data.data })
    } else {
        dispatch({ type: GET_MESSAGES_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const setCurrentConversation = (data) => {
    return ({
        type: SET_CURRENT_CONVERSATION,
        payload: data
    })
}

export const addMessage = (data) => async (dispatch) => {
    dispatch({ type: ADD_MESSAGE })
    const url = `message`
    const Data = await callApi(url, 'POST', data, true);
    if (Data?.status === 200) {
        dispatch({ type: ADD_MESSAGE_SUCCESS, payload: Data?.data.data })
    } else {
        dispatch({ type: ADD_MESSAGE_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const setArrivalMessage = (data) => {
    return ({
        type: SET_ARRIVAL_MESSAGE,
        payload: data
    })
}

export const setTypers = (data) => {
    return ({
        type: SET_TYPERS,
        payload: data
    })
}