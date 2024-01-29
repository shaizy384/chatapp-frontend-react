import { CLOSE_CHATBOX, CLOSE_SEARCH_FRIEND, OPEN_CHATBOX, OPEN_SEARCH_FRIEND } from "../actionTypes"

export const openChatBox = () => {
    return ({
        type: OPEN_CHATBOX,
    })
}

export const closeChatBox = () => {
    return ({
        type: CLOSE_CHATBOX,
    })
}

export const openSearchFriend = () => {
    return ({
        type: OPEN_SEARCH_FRIEND,
    })
}

export const closeSearchFriend = () => {
    return ({
        type: CLOSE_SEARCH_FRIEND,
    })
}