import { GET_FRIEND_DETAILS, GET_FRIEND_DETAILS_FAILURE, GET_FRIEND_DETAILS_SUCCESS } from "../actionTypes";

const initial_state = {
    message: null,
    loading: false,
    data: null,
}

const friendDetailsReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case GET_FRIEND_DETAILS:
            return { ...state, loading: true }

        case GET_FRIEND_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case GET_FRIEND_DETAILS_FAILURE:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default friendDetailsReducer;