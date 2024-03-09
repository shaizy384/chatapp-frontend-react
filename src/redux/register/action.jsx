import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS, UPLOAD_PIC, UPLOAD_PIC_FAILURE, UPLOAD_PIC_SUCCESS } from "../actionTypes"
import { UploadAPI } from "../../apis/UploadAPI";

export const signupUser = (data) => async (dispatch) => {
    dispatch({ type: SIGNUP })
    const url = "user/register"
    const Data = await callApi(url, 'POST', data, true);
    if (Data?.status === 200) {
        dispatch({ type: SIGNUP_SUCCESS, payload: Data?.data })
        window.location.href = '/verifyemail';
    } else {
        dispatch({ type: SIGNUP_FAILURE })
        toast.error(Data?.data.message)
    }
}

export const uploadProfile = (data) => async (dispatch) => {
    dispatch({ type: UPLOAD_PIC })
    const url = "image/upload"
    const Data = await UploadAPI(url, 'POST', data, true);
    if (Data?.status === 200) {
        dispatch({ type: UPLOAD_PIC_SUCCESS, payload: Data?.data })
    } else {
        dispatch({ type: UPLOAD_PIC_FAILURE })
        toast.error(Data?.data.message)
    }
}
