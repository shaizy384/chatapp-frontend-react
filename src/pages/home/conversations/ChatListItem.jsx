import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openChatBox } from '../../../redux/openChatBox/action'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import { getFriendDetails } from '../../../redux/friendDetails/action'
import { callApi } from '../../../apis/APIs'
import { getMessages } from '../../../redux/messages/action'

const ChatListItem = ({ _id, members }) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await callApi(`friends/${members[1]}`, 'GET', '', true);;
                setUser(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [members[1]])
    const handleChat = () => {
        dispatch(openChatBox())
        dispatch(getMessages(_id))
    }
    return (
        <>
            <li className="flex justify-between gap-x-6 py-5 px-5 cursor-pointer hover:bg-gray-200" onClick={handleChat}>
                <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={defaultAvatar} alt="defaultAvatar" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold leading-6 text-gray-900 truncate">{user}</p>
                        <p className="mt-1 truncate text-md leading-5 text-gray-500">My message</p>
                    </div>
                </div>
                {/* <div className="shrink-0 flex flex-col items-end">
                    {person.lastSeen ? (
                        <p className="mt-1 text-md leading-5 text-gray-500">
                            <time dateTime='2023-01-23T13:23Z'>3h ago</time>
                        </p>
                    ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                    )}
                </div> */}
            </li>
        </>
    )
}

export default ChatListItem