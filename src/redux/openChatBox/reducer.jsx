import { CLOSE_CHATBOX, CLOSE_PROFILE, CLOSE_SEARCH_FRIEND, OPEN_CHATBOX, OPEN_PROFILE, OPEN_SEARCH_FRIEND } from "../actionTypes";

const initial_state = {
    chatBox: {
        open: false
    },
    searchFriendBox: {
        open: false
    },
    profileSec: {
        open: false
    },
}

const chatBoxReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case OPEN_CHATBOX:
            return {
                chatBox: { open: true },
                searchFriendBox: { open: false },
                profileSec: { open: false },
            }

        case CLOSE_CHATBOX:
            return { open: false }

        case OPEN_SEARCH_FRIEND:
            return {
                searchFriendBox: { open: true },
                chatBox: { open: false },
                profileSec: { open: false },
            }

        case CLOSE_SEARCH_FRIEND:
            return {
                chatBox: { open: false },
            }

        case OPEN_PROFILE:
            return {
                profileSec: { open: true },
                chatBox: { open: false },
                searchFriendBox: { open: false },
            }

        case CLOSE_PROFILE:
            return {
                profileSec: { open: false },
            }

        default:
            return state;
    }
}

export default chatBoxReducer;