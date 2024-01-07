import { CHAT_LIST_FILTER, GET_CONVERSATIONS, GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_SUCCESS } from "../actionTypes";

const initial_state = {
    getConversation: {
        message: null,
        loading: false,
        data: null,
    },
    chatListFilter: {
        message: null,
        loading: false,
        data: "all",
    },
}

const conversationReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case GET_CONVERSATIONS:
            return { ...state, getConversation: { loading: true } }

        case GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                getConversation: {
                    loading: false,
                    data: payload
                }
            }

        case GET_CONVERSATIONS_FAILURE:
            return {
                ...state,
                getConversation: {
                    loading: false
                }
            };

        case CHAT_LIST_FILTER:
            return {
                ...state,
                chatListFilter: {
                    data: payload
                }
            }

        default:
            return state;
    }
}

export default conversationReducer;