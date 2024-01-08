import React from 'react'
import { useDispatch } from 'react-redux'
import { closeChatBox } from '../../../redux/openChatBox/action'

const ChatBoxHeader = () => {
    const dispatch = useDispatch()
    return (
        <>
            <div className="flex justify-between gap-x-6 py-6 sm:px-5 px-4 border-b dark:border-gray-600 rounded-t-2xl bg-white dark:bg-gray-800">
                <div className="flex items-center min-w-0 gap-x-4">
                    <div className="flex items-center gap-1">
                        <span className='sm:hidden' onClick={() => dispatch(closeChatBox())}><i className="fa-solid fa-arrow-left fa-lg cursor-pointer"></i></span>
                        <img className="h-11 w-11 flex-none rounded-full bg-gray-50" src='https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                    </div>
                    <div className="min-w-0 flex-auto"> 
                        <p className="text-lg sm:text-xl font-semibold leading-6 text-gray-900 dark:text-white">Shahzaib Qasim</p>
                        <p className="truncate text-md leading-5 text-sky-600 dark:text-sky-500">typing...</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* <i className="fa-solid fa-video fa-lg text-gray-400 cursor-pointer"></i> */}
                    <i className="fa-solid fa-phone fa-lg text-gray-400 cursor-pointer"></i>
                    <i className="fa-solid fa-ellipsis-vertical fa-lg text-gray-400 cursor-pointer"></i>
                </div>
            </div>
        </>
    )
}

export default ChatBoxHeader