import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openChatBox } from '../../../redux/openChatBox/action'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import { callApi } from '../../../apis/APIs'
import { getMessages, setCurrentConversation } from '../../../redux/messages/action'

const UserListItem = ({ _id, members }) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState()
    const [showUser, setShowUser] = useState(false)
    const userListFilter = useSelector(state => state.conversationReducer.chatListFilter?.data)
    const onlineFriends = useSelector(state => state.conversationReducer.setOnlineFriends?.data)
    const searchFriend = useSelector(state => state.conversationReducer.searchFriend?.data)
    const online = onlineFriends?.filter(user => user.userId === members[1]).length > 0
    const userData = useSelector(state => state.userDataReducer.data)

    useEffect(() => {
        if (userListFilter === "all") {
            setShowUser(true);
        } else if (userListFilter === "active" && online) {
            setShowUser(true);
        } else {
            setShowUser(false);
        }
    }, [userListFilter])

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await callApi(`friends/${members[1]}`, 'GET', '', true);
                setUser(res.data?.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [members[1]])
    const handleChat = () => {
        dispatch(openChatBox())
        dispatch(getMessages(_id))
        dispatch(setCurrentConversation({ conversationId: _id, members, user }))
    }
    return (
        <>
            {((showUser) &&
                user?.name.toLowerCase().includes(searchFriend)) &&
                <li className="flex justify-between gap-x-6 py-5 px-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" onClick={handleChat}>
                    <div className="flex min-w-0 gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.photoURL ? user.photoURL : defaultAvatar} alt="defaultAvatar" />
                        <div className="min-w-0 flex-auto grid items-center">
                            <p className="text-lg font-semibold leading-6 text-gray-900 dark:text-white truncate">{user?.name}</p>
                            {/* <p className="mt-1 truncate text-md leading-5 text-gray-500 dark:text-gray-400">My message</p> */}
                            {user?._id === userData?._id && <p className="mt-1 truncate text-md leading-5 text-gray-500 dark:text-gray-400">Message yourself</p>}
                        </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end">
                        {online && <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-sky-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">Online</p>
                        </div>}
                    </div>
                </li>
            }
        </>
    )
}

export default UserListItem