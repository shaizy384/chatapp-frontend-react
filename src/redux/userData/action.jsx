import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { USER_DATA, USER_DATA_FAILURE, USER_DATA_SUCCESS } from "../actionTypes"

export const getUserData = () => async (dispatch) => {
    dispatch({ type: USER_DATA })
    const url = "user/fetchuser/"
    const Data = await callApi(url, 'GET', '', true);
    if (Data.status === 200) {
        dispatch({ type: USER_DATA_SUCCESS, payload: Data.data })
    } else {
        dispatch({ type: USER_DATA_FAILURE })
        toast.error(Data.data.message)
    }
}
