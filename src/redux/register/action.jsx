import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../actionTypes"

export const signupUser = (data) => async (dispatch) => {
    dispatch({ type: SIGNUP })
    const url = "user/register"
    const Data = await callApi(url, 'POST', data, true);
    console.log('Data: ', Data);
    if (Data.status === 200) {
        dispatch({ type: SIGNUP_SUCCESS })
        window.location.href = '/verifyemail';
    } else {
        dispatch({ type: SIGNUP_FAILURE })
        toast.error(Data.data.message)
    }
}
