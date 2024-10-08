import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeChatBox, openProfile } from '../../../redux/openChatBox/action'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import ProfileDialog from '../../../components/ProfileDialog'

const ChatBoxHeader = ({ online, isTyping }) => {
    const dispatch = useDispatch()
    const dropdownRef = useRef(null);
    const searchedUser = useSelector(state => state.conversationReducer.findFriend.data)
    let currentConversation = useSelector(state => state.messagesReducer.currentConversation?.data)
    const user = useSelector(state => state.messagesReducer.currentConversation?.data?.user)
    // const onlineFriends = useSelector(state => state.conversationReducer.setOnlineFriends?.data)
    // const online = onlineFriends?.filter(u => u.userId === user._id).length === 1
    // console.log("online: ",online,onlineFriends,user);

    // const typers = useSelector(state => state.messagesReducer.setTypers?.data)
    // const isTyping = typers?.filter(t => (t.userId === user._id) && t.conversationId === currentConversation.conversationId && t.typing).length > 0
    // console.log("typers typers: ", typers, currentConversation, isTyping);

    // for closing dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                dropdownRef.current.style.display = "none"
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const setShowDrop = () => {
        dropdownRef.current.style.display = "block"
    }
    const showProfile = () => {
        dropdownRef.current.style.display = "none"
        dispatch(openProfile())
    }
    return (
        <>
            <div className="flex justify-between gap-x-6 py-6 sm:px-5 px-4 border-b dark:border-gray-600 rounded-t-2xl bg-white dark:bg-gray-800">
                <div className="flex items-center min-w-0 gap-x-4">
                    <div className="flex items-center gap-1">
                        <span className='sm:hidden dark:text-white' onClick={() => dispatch(closeChatBox())}><i className="fa-solid fa-arrow-left fa-lg cursor-pointer"></i></span>
                        <img className="h-11 w-11 flex-none rounded-full bg-gray-50" src={user?.photoURL ? user?.photoURL : defaultAvatar} alt="" />
                    </div>
                    <div className="min-w-0 flex-auto">
                        <p className="text-lg sm:text-xl truncate font-semibold leading-6 text-gray-900 dark:text-white">{user?.name || searchedUser?.name}</p>
                        {isTyping &&
                            <p className="truncate text-md leading-5 text-sky-600 dark:text-sky-500">typing...</p>}
                        {!isTyping && online && < p className="truncate text-md leading-5 text-sky-600 dark:text-sky-500">Online</p>}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="dropdown">
                        <button type='button' className='p-1' onClick={setShowDrop}>
                            <i className="fa-solid fa-ellipsis-vertical fa-lg text-gray-400 cursor-pointer"></i>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="dropdownDots" ref={dropdownRef} className={"hidden absolute right-3 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-md w- dark:bg-gray-700 dark:divide-gray-600 text-gray-700 dark:text-gray-200"}>
                            {/* <button onClick={showProfile} className=" w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg dark:hover:text-white">View Profile</button> */}
                            <ProfileDialog />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ChatBoxHeader