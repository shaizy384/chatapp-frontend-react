import { GET_MESSAGES, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS, ADD_MESSAGE, ADD_MESSAGE_FAILURE, ADD_MESSAGE_SUCCESS, SET_CURRENT_CONVERSATION, SET_ARRIVAL_MESSAGE, SET_TYPERS } from "../actionTypes";

const initial_state = {
    getMessage: {
        loading: false,
        data: null,
        error: null,
        conversationId: null
    },
    addMessage: {
        loading: false,
        data: null,
        error: null,
    },
    conversationId: {
        loading: false,
        data: null,
        error: null,
    },
    setTypers: {
        loading: false,
        data: null,
        error: null,
    },
}

const messagesReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case SET_CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: {
                    data: payload
                }
            }

        case GET_MESSAGES:
            return {
                ...state,
                getMessage: {
                    loading: true
                }
            }

        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                getMessage: {
                    loading: false,
                    data: payload
                }
            }

        case GET_MESSAGES_FAILURE:
            return {
                ...state,
                getMessage: {
                    loading: false
                }
            };

        case ADD_MESSAGE:
            return {
                ...state,
                addMessage: {
                    loading: true
                }
            }

        case ADD_MESSAGE_SUCCESS:
            return {
                ...state,
                addMessage: {
                    loading: false,
                    data: payload
                },
                getMessage: {
                    loading: false,
                    data: [...state.getMessage.data, payload]
                }
            }

        case ADD_MESSAGE_FAILURE:
            return {
                ...state,
                addMessage: {
                    loading: false
                }
            };

        case SET_ARRIVAL_MESSAGE:
            return {
                ...state,
                getMessage: {
                    data: [...state.getMessage.data, payload]
                }
            };

        case SET_TYPERS:
            return {
                ...state,
                setTypers: {
                    data: payload
                }
            };

        default:
            return state;
    }
}

export default messagesReducer;