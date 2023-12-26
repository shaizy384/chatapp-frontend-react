import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../actionTypes";

const initial_state = {
    // token: localStorage.getItem('authToken'),
    // isAuthenticated:
    //     localStorage.getItem('authToken') && localStorage.getItem('authToken') !== undefined
    //         ? true
    //         : false,
    message: null,
    loading: false,
}

const signupReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case SIGNUP:
            return { ...state, loading: true }

        case SIGNUP_SUCCESS:
            // localStorage.setItem('authToken', payload.token);
            return {
                ...state,
                loading: false,
                message: null,
                isAuthenticated: true,
                error: null
            }

        case SIGNUP_FAILURE:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default signupReducer;