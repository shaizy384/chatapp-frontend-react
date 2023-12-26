import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { GET_FRIEND_DETAILS, GET_FRIEND_DETAILS_FAILURE, GET_FRIEND_DETAILS_SUCCESS } from "../actionTypes"

export const getFriendDetails = (id) => async (dispatch) => {
    dispatch({ type: GET_FRIEND_DETAILS })
    const url = `friends/${id}`
    const Data = await callApi(url, 'GET', '', true);
    if (Data.status === 200) {
        dispatch({ type: GET_FRIEND_DETAILS_SUCCESS, payload: Data.data.data })
    } else {
        dispatch({ type: GET_FRIEND_DETAILS_FAILURE })
        toast.error(Data.data.message)
    }
}
