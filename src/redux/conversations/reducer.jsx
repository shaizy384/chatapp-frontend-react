import { GET_CONVERSATIONS, GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_SUCCESS } from "../actionTypes";

const initial_state = {
    message: null,
    loading: false,
    data: null,
}

const conversationReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case GET_CONVERSATIONS:
            return { ...state, loading: true }

        case GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }

        case GET_CONVERSATIONS_FAILURE:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default conversationReducer;