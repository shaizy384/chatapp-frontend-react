import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { GET_CONVERSATIONS, GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_SUCCESS, SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../actionTypes"

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
