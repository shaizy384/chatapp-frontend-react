import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SET_PROVIDER } from "../actionTypes";

const initial_state = {
    token: localStorage.getItem('authToken'),
    isAuthenticated:
        localStorage.getItem('authToken') && localStorage.getItem('authToken') !== undefined
            ? true
            : false,
    isVerified: false,
    message: null,
    loading: false,
    provider: localStorage.getItem("provider"),
};

const authReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case SET_PROVIDER:
            return { ...state, provider: payload };

        case LOGIN:
            return { ...state, loading: true };

        case LOGIN_SUCCESS:
            localStorage.setItem("authToken", payload.auth);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                isVerified: payload.isVerified,
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
