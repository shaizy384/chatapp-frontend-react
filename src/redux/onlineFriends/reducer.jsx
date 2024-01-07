import { CHAT_LIST_FILTER, SET_ONLINE_FRIENDS } from "../actionTypes";

const initial_state = {
    setOnlineFriends: {
        message: null,
        loading: false,
        data: null,
    },
    // chatListFilter: {
    //     message: null,
    //     loading: false,
    //     data: null,
    // }
}

const onlineFriends = (state = initial_state, { type, payload }) => {
    switch (type) {
        case SET_ONLINE_FRIENDS:
            return {
                ...state,
                setOnlineFriends: {
                    data: payload
                }
            }

        // case CHAT_LIST_FILTER:
        //     return {
        //         ...state,
        //         chatListFilter: {
        //             data: payload
        //         }
        //     }
        default:
            return state;
    }
}

export default onlineFriends;