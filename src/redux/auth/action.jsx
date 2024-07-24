import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, EMPTY_FORGOT_PASSWORD, RESET_PASSWORD, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, SET_PROVIDER } from "../actionTypes"

export const loginUser = (data) => async (dispatch) => {
    dispatch({ type: LOGIN })
    const url = "user/login"
    const Data = await callApi(url, 'POST', data, true);
    if (Data?.status === 200) {
        dispatch({ type: LOGIN_SUCCESS, payload: Data?.data })
    } else {
        dispatch({ type: LOGIN_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD })
    const url = "user/forgot-password"
    const Data = await callApi(url, 'POST', data, true);
    if (Data?.status === 200) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: Data?.data })
    } else {
        dispatch({ type: FORGOT_PASSWORD_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const emptyForgotPassword = () => {
    return ({
        type: EMPTY_FORGOT_PASSWORD
    })
}

export const resetPassword = (data) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD })
    const url = "user/reset-password"
    const Data = await callApi(url, 'POST', data, true);
    if (Data?.status === 200) {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: Data?.data })
        toast.success(Data?.data.message)
    } else {
        dispatch({ type: RESET_PASSWORD_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const setProvider = (data) => {
    return ({
        type: SET_PROVIDER,
        payload: data,
    })
}

export const Logout = () => {
    return ({
        type: LOGOUT,
    })
}
