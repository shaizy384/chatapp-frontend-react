import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { CHAT_LIST_FILTER, EMPTY_FIND_FRIEND, FIND_FRIEND, FIND_FRIEND_FAILURE, FIND_FRIEND_SUCCESS, GET_CONVERSATIONS, GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_SUCCESS, SET_ONLINE_FRIENDS } from "../actionTypes"

export const getConversations = () => async (dispatch) => {
    dispatch({ type: GET_CONVERSATIONS })
    const url = "chats/"
    const Data = await callApi(url, 'GET', '', true);
    if (Data.status === 200) {
        dispatch({ type: GET_CONVERSATIONS_SUCCESS, payload: Data.data.data })
    } else {
        dispatch({ type: GET_CONVERSATIONS_FAILURE })
        toast.error(Data.data.message)
    }
}

export const chatListFilter = (data) => {
    return ({
        type: CHAT_LIST_FILTER,
        payload: data
    })
}

export const setOnlineFriends = (data) => {
    return ({
        type: SET_ONLINE_FRIENDS,
        payload: data
    })
}

export const findFriend = (data) => async (dispatch) => {
    dispatch({ type: FIND_FRIEND })
    const url = `friends/findUser/${data}`
    const Data = await callApi(url, 'GET', '', true);
    if (Data.status === 200) {
        dispatch({ type: FIND_FRIEND_SUCCESS, payload: Data.data.data })
    } else {
        dispatch({ type: FIND_FRIEND_FAILURE })
        toast.error(Data.data.message)
    }
}

export const emptyFindFriend = () => {
    return ({
        type: EMPTY_FIND_FRIEND
    })
}