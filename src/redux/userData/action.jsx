import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, USER_DATA, USER_DATA_FAILURE, USER_DATA_SUCCESS } from "../actionTypes"

export const getUserData = () => async (dispatch) => {
    dispatch({ type: USER_DATA })
    const url = "user/fetchuser/"
    const Data = await callApi(url, 'GET', '', true);
    if (Data?.status === 200) {
        dispatch({ type: USER_DATA_SUCCESS, payload: Data?.data })
    } else {
        dispatch({ type: USER_DATA_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const updateUser = (data) => async (dispatch) => {
    dispatch({ type: UPDATE_USER })
    const url = "user/updateuser"
    const Data = await callApi(url, 'POST', data, true);
    console.log("Data Data Data: ", Data);
    if (Data?.status === 200) {
        console.log("Data Data?.status === 200: ", Data);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: Data?.data?.user })
        toast.success(Data.data.message)
    } else {
        dispatch({ type: UPDATE_USER_FAILURE })
        toast.error(Data?.data.message)
    }
}