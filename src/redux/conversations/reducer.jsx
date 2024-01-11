import { CHAT_LIST_FILTER, EMPTY_FIND_FRIEND, FIND_FRIEND, FIND_FRIEND_FAILURE, FIND_FRIEND_SUCCESS, GET_CONVERSATIONS, GET_CONVERSATIONS_FAILURE, GET_CONVERSATIONS_SUCCESS, SET_ONLINE_FRIENDS } from "../actionTypes";

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
    findFriend: {
        message: null,
        loading: false,
        data: null,
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

        case SET_ONLINE_FRIENDS:
            return {
                ...state,
                setOnlineFriends: {
                    data: payload
                }
            }

        case CHAT_LIST_FILTER:
            // console.log("filter: ", payload, state.getConversation.data, state.setOnlineFriends.data);
            // const filterUsers = state.getConversation.data.filter(user => state.setOnlineFriends.data.includes(user.userId))
            // console.log("filter: ", state.setOnlineFriends.data.some(u => u.userId === "654b28bbea6fe482175b3e46"))
            // console.log("filter: ", state.getConversation.data.filter(user => state.setOnlineFriends.data.some(u => u.userId === user.members[1])))
            // const filteredConversation = state.getConversation.data.filter(user => state.setOnlineFriends.data.some(u => u.userId === user.members[1]))
            return {
                ...state,
                chatListFilter: {
                    data: payload
                },
                // getConversation: {
                //     loading: false,
                //     data: filteredConversation
                // }
            }

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