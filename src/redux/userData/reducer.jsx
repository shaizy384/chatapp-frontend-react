import { UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS, USER_DATA, USER_DATA_FAILURE, USER_DATA_SUCCESS } from "../actionTypes";

const initial_state = {
    message: null,
    loading: false,
    data: null,
    updateUser: {
        message: null,
        loading: false,
        data: null,
    }
}

const userDataReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case USER_DATA:
            return { ...state, loading: true }

        case USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case USER_DATA_FAILURE:
            return {
                ...state,
                loading: false
            };

        case UPDATE_USER:
            return {
                ...state,
                loading: true
                // updateUser: {
                // }
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
                // updateUser: {
                // }
            }

        case UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false
                // updateUser: {
                // }
            };

        default:
            return state;
    }
}

export default userDataReducer;