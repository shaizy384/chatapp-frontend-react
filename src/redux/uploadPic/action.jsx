import { toast } from "react-toastify";
import { UPLOAD_PIC, UPLOAD_PIC_FAILURE, UPLOAD_PIC_SUCCESS } from "../actionTypes"
import { UploadAPI } from "../../apis/UploadAPI";

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
