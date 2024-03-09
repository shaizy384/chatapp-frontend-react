import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS, UPLOAD_PIC, UPLOAD_PIC_FAILURE, UPLOAD_PIC_SUCCESS } from "../actionTypes";

const initial_state = {
    // token: localStorage.getItem('authToken'),
    // isAuthenticated:
    //     localStorage.getItem('authToken') && localStorage.getItem('authToken') !== undefined
    //         ? true
    //         : false,
    message: null,
    loading: false,
    // uploadProfile: {
    //     message: null,
    //     loading: false,
    //     data: null,
    // }
}

const signupReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case SIGNUP:
            return { ...state, loading: true }

        case SIGNUP_SUCCESS:
            localStorage.setItem('authToken', payload.data);
            return {
                ...state,
                loading: false,
                message: null,
                error: null
            }

        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false
            };

        // case UPLOAD_PIC:
        //     return {
        //         ...state,
        //         uploadProfile: {
        //             loading: true
        //         }
        //     }

        // case UPLOAD_PIC_SUCCESS:
        //     return {
        //         ...state,
        //         uploadProfile: {
        //             loading: false,
        //             data: payload?.url,
        //         }
        //     }

        // case UPLOAD_PIC_FAILURE:
        //     return {
        //         ...state,
        //         uploadProfile: {
        //             loading: false
        //         }
        //     };

        default:
            return state;
    }
}

export default signupReducer;