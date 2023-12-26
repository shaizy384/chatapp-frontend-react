import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { GET_MESSAGES, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS } from "../actionTypes"

export const getMessages = (id) => async (dispatch) => {
    dispatch({ type: GET_MESSAGES })
    const url = `message/${id}`
    const Data = await callApi(url, 'GET', '', true);
    if (Data.status === 200) {
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: Data.data.data })
    } else {
        dispatch({ type: GET_MESSAGES_FAILURE })
        toast.error(Data.data.message)
    }
}
