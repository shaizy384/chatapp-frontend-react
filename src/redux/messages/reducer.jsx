import { GET_MESSAGES, GET_MESSAGES_FAILURE, GET_MESSAGES_SUCCESS, ADD_MESSAGE, ADD_MESSAGE_FAILURE, ADD_MESSAGE_SUCCESS } from "../actionTypes";

const initial_state = {
    getMessage: {
        loading: false,
        data: null,
        error: null,
    },
    addMessage: {
        loading: false,
        data: null,
        error: null,
    },
}

const messagesReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case GET_MESSAGES:
            return {
                ...state,
                getMessage: { loading: true }
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
            console.log("ADD_MESSAGE_SUCCESS ADD_MESSAGE_SUCCESS:: ", payload);
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

        default:
            return state;
    }
}

export default messagesReducer;