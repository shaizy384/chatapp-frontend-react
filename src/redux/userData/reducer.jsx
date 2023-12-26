import { USER_DATA, USER_DATA_FAILURE, USER_DATA_SUCCESS } from "../actionTypes";

const initial_state = {
    message: null,
    loading: false,
    data: null,
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

        default:
            return state;
    }
}

export default userDataReducer;