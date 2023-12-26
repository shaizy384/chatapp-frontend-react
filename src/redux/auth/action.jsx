import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actionTypes"

export const loginUser = (data) => async (dispatch) => {
    dispatch({ type: LOGIN })
    const url = "user/login"
    const Data = await callApi(url, 'POST', data, true);
    console.log('Data: ', Data);
    if (Data.status === 200 ) {
        dispatch({ type: LOGIN_SUCCESS, payload: Data.data })
        window.location.href = '/';
    } else {
        dispatch({ type: LOGIN_FAILURE })
        toast.error(Data.data.message)
    }
}

export const Logout = () => {
    return ({
        type: LOGOUT,
    })
}
