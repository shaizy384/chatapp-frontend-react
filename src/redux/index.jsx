import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import signupReducer from "./register/reducer";
import chatBoxReducer from "./openChatBox/reducer";
import conversationReducer from "./conversations/reducer";
import friendDetailsReducer from "./friendDetails/reducer";
import messagesReducer from "./messages/reducer";
import userDataReducer from "./userData/reducer";
import onlineFriends from "./onlineFriends/reducer";

const reducers = combineReducers({
    authReducer: authReducer,
    signupReducer: signupReducer,
    chatBoxReducer: chatBoxReducer,
    conversationReducer: conversationReducer,
    friendDetailsReducer: friendDetailsReducer,
    messagesReducer: messagesReducer,
    userDataReducer: userDataReducer,
    onlineFriends: onlineFriends,
})

export default reducers;