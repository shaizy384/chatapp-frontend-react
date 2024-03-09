import { UPLOAD_PIC, UPLOAD_PIC_FAILURE, UPLOAD_PIC_SUCCESS } from "../actionTypes";

const initial_state = {
    uploadPic: {
        message: null,
        loading: false,
        data: null,
    }
}

const uploadPicReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case UPLOAD_PIC:
            return {
                ...state,
                uploadPic: {
                    loading: true
                }
            }

        case UPLOAD_PIC_SUCCESS:
            return {
                ...state,
                uploadPic: {
                    loading: false,
                    data: payload?.url,
                }
            }

        case UPLOAD_PIC_FAILURE:
            return {
                ...state,
                uploadPic: {
                    loading: false
                }
            };

        default:
            return state;
    }
}

export default uploadPicReducer;