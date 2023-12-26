import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actionTypes";

const initial_state = {
    // token: localStorage.getItem('authToken'),
    isAuthenticated:
        localStorage.getItem('authToken') && localStorage.getItem('authToken') !== undefined
            ? true
            : false,
    message: null,
    loading: false,
};

const authReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return { ...state, loading: true };

        case LOGIN_SUCCESS:
            localStorage.setItem("authToken", payload.auth);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case LOGOUT:
            localStorage.removeItem("authToken");
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            };

        default:
            return state;
    }
};

export default authReducer;
