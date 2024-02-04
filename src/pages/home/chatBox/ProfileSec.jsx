import React from 'react'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { closeProfile, openChatBox } from '../../../redux/openChatBox/action';
import { getMessages, setCurrentConversation } from '../../../redux/messages/action';
import { createConversations } from '../../../redux/conversations/action';

const ProfileSec = () => {
    const dispatch = useDispatch()
    const currentConversation = useSelector(state => state.messagesReducer.currentConversation?.data.user)
    const userData = useSelector(state => state.userDataReducer.data)
    const usersList = useSelector(state => state.conversationReducer.getConversation.data)
    console.log("usersList: ", currentConversation, usersList);
    const handleMessage = () => {
        dispatch(openChatBox())
        console.log("currentConversation: ", currentConversation);
        if (currentConversation?._id === userData?._id) {
            console.log("ownConv amb: ");
            const ownConv = usersList.filter(e => e.members[1] === userData._id)
            console.log("ownConv: ", ownConv[0]);
            if (ownConv[0]) {
                // if conversation is undefined, create conversation
                dispatch(createConversations({ senderId: userData._id }))
            }
            else {
                dispatch(getMessages(ownConv[0]._id))
                dispatch(setCurrentConversation({ conversationId: ownConv[0]._id, members: ownConv[0].members, user: userData }))
            }
        }
    }
    return (
        <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 dark:bg-gray-800 relative flex flex-col pt-4'>
            <div className='ps-9'>
                <button className='sm:hidden flex items-baseline border-transparent text-gray-800 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 rounded group' onClick={() => dispatch(closeProfile())}>
                    <i className="fa-solid fa-arrow-left fa-sm animate-bounce ps-0.5 group-hover:ps-0 group-hover:pe-0.5"></i>
                    <span className='ps-1.5 font-semibold'>Back</span>
                </button>
            </div>
            <div className='flex-1 grow flex flex-col items-center justify-center p-4 dark:border-gray-600'>
                <img className='h-28 w-28 mb-3 rounded-full' src={currentConversation?.photoURL ? currentConversation?.photoURL : defaultAvatar} alt="profile-pic" />
                <h1 className='font-semibold text-2xl dark:text-white mt-1 mb-1'>{currentConversation?.name}</h1>
                <div className="flex flex-c mb-8">
                    <p className='text-gray-800 dark:text-gray-400'>{currentConversation?.email}</p>
                </div>
                <div>
                    <button type="submit" onClick={handleMessage} className={"flex w-full justify-center items-center rounded-md bg-transparent text-sky-400 border-2 transition-all border-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-sky-400"}>
                        <i className="fa-solid fa-paper-plane pe-2.5"></i>
                        <span>Send Message {(currentConversation?._id === userData?._id) && "Yourself"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSec