import { toast } from "react-toastify";
import { callApi } from "../../apis/APIs";
import { CHAT_LIST_FILTER, SET_ONLINE_FRIENDS } from "../actionTypes"

export const setOnlineFriends = (data) => {
    return ({
        type: SET_ONLINE_FRIENDS,
        payload: data
    })
}


// export const chatListFilter = (data) => {
//     return ({
//         type: CHAT_LIST_FILTER,
//         payload: data
//     })
// }