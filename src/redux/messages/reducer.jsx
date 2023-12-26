import { GET_MESSAGES, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS } from "../actionTypes";

const initial_state = {
    message: null,
    loading: false,
    data: null,
}

const messagesReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case GET_MESSAGES:
            return { ...state, loading: true }

        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case GET_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default messagesReducer;