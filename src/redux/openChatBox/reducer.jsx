import { CLOSE_CHATBOX, OPEN_CHATBOX } from "../actionTypes";

const initial_state = {
    open: false
}

const chatBoxReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case OPEN_CHATBOX:
            return { open: true }

        case CLOSE_CHATBOX:
            return { open: false }

        default:
            return state;
    }
}

export default chatBoxReducer;