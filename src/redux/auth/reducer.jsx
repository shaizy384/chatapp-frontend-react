import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, EMPTY_FORGOT_PASSWORD, RESET_PASSWORD, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, SET_PROVIDER, SOCIAL_LOGIN, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE } from "../actionTypes";

const initial_state = {
    token: localStorage.getItem('authToken'),
    isAuthenticated:
        localStorage.getItem('authToken') && localStorage.getItem('authToken') !== undefined
            ? true
            : false,
    isVerified: false,
    message: null,
    loading: false,
    provider: localStorage.getItem("provider") || "custom",
    forgot: {
        message: null,
        loading: false,
        success: false
    },
    resetPassword: {
        message: null,
        loading: false,
        success: false,
    },
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

        case SOCIAL_LOGIN:
            return { ...state, loading: true };

        case SOCIAL_LOGIN_SUCCESS:
            localStorage.setItem("authToken", payload.auth);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                isVerified: payload.isVerified,
            };

        case SOCIAL_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case FORGOT_PASSWORD:
            return {
                ...state,
                forgot: {
                    ...state.forgot,
                    loading: true,
                }
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgot: {
                    ...state.forgot,
                    loading: false,
                    success: true
                }
            };

        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                forgot: {
                    ...state.forgot,
                    loading: false,
                    success: false
                }
            };

        case EMPTY_FORGOT_PASSWORD:
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    loading: false,
                    success: true
                }
            };

        case RESET_PASSWORD:
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    loading: true,
                }
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    loading: false,
                    success: true
                }
            };

        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                resetPassword: {
                    ...state.resetPassword,
                    loading: false,
                    success: false
                }
            };

        case LOGOUT:
            localStorage.removeItem("authToken");
            localStorage.removeItem("provider");
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
