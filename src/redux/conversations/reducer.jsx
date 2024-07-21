import { CHAT_LIST_FILTER, CREATE_CONVERSATION, CREATE_CONVERSATION_FAILURE, CREATE_CONVERSATION_SUCCESS, EMPTY_FIND_FRIEND, EMPTY_SEARCH_FRIEND, FIND_FRIEND, FIND_FRIEND_FAILURE, FIND_FRIEND_SUCCESS, GET_CONVERSATIONS, GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_SUCCESS, SEARCH_FRIEND, SET_ONLINE_FRIENDS } from "../actionTypes";

const initial_state = {
    getConversation: {
        message: null,
        loading: false,
        data: null,
    },
    createConversation: {
        message: null,
        loading: false,
        data: null,
    },
    chatListFilter: {
        message: null,
        loading: false,
        data: "all",
    },
    findFriend: {
        message: null,
        loading: false,
        data: null,
    },
    searchFriend: {
        message: null,
        loading: false,
        data: "",
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

        case CREATE_CONVERSATION:
            return { ...state, createConversation: { loading: true } }
        case CREATE_CONVERSATION_SUCCESS:
            return {
                ...state,
                createConversation: {
                    loading: false,
                    data: payload
                },
                getConversation: {
                    loading: false,
                    data: [payload, ...state.getConversation.data]
                }
            }
        case CREATE_CONVERSATION_FAILURE:
            return {
                ...state,
                createConversation: {
                    loading: false
                }
            };

        case SET_ONLINE_FRIENDS:
            return {
                ...state,
                setOnlineFriends: {
                    data: payload
                }
            }

        case CHAT_LIST_FILTER:
            return {
                ...state,
                chatListFilter: {
                    data: payload
                },
            }

        case SEARCH_FRIEND:
            return {
                ...state,
                searchFriend: {
                    data: payload
                },
            }

        case EMPTY_SEARCH_FRIEND:
            return {
                ...state,
                searchFriend: {
                    data: ""
                }
            };

        case FIND_FRIEND:
            return {
                ...state,
                findFriend: { loading: true }
            }
        case FIND_FRIEND_SUCCESS:
            return {
                ...state,
                findFriend: {
                    loading: false,
                    data: payload
                }
            }
        case FIND_FRIEND_FAILURE:
            return {
                ...state,
                findFriend: {
                    loading: false
                }
            };

        case EMPTY_FIND_FRIEND:
            return {
                ...state,
                findFriend: {
                    data: null
                }
            };

        default:
            return state;
    }
}

export default conversationReducer;