import React from 'react'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { openChatBox } from '../../../redux/openChatBox/action';

const ProfileSec = () => {
    const dispatch = useDispatch()
    let currentConversation = useSelector(state => state.messagesReducer.currentConversation?.data.user)
    console.log(
        "currentConversation:", currentConversation
    );
    return (
        <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 dark:bg-gray-800 relative flex flex-col pt-4'>
            <div className='flex-1 grow flex flex-col items-center justify-center p-4 dark:border-gray-600'>
                <img className='h-28 w-28 mb-3' src={defaultAvatar} alt="profile-pic" />
                <h1 className='font-semibold text-2xl dark:text-white mt-1 mb-1'>{currentConversation?.name}</h1>
                <div className="flex flex-c mb-8">
                    <p className='text-gray-800 dark:text-gray-400'>{currentConversation?.email}</p>
                </div>
                <div>
                    <button type="submit" onClick={()=>dispatch(openChatBox())} className={"flex w-full justify-center rounded-md bg-transparent text-sky-400 border-2 transition-all border-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-sky-400"}>
                        <span>Send Message</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSec