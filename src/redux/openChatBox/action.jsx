import { CLOSE_CHATBOX, OPEN_CHATBOX } from "../actionTypes"

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
