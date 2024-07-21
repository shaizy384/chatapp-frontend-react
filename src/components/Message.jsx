import React from 'react'
import { format } from 'timeago.js'
import defaultAvatar from '../assets/images/default-avatar-icon.png'

const Message = ({ photoURL, text, createdAt, own }) => {
    return (
        <>
            <div className={"flex min-w-0 gap-x-4 my-3 mx-3 max-w-[414px] " + (own ? "justify-end ml-auto pl-[45px]" : "mr-auto pr-[40px]")}>
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={photoURL ? photoURL : defaultAvatar} alt="" />
                <div className={"min-w-0 " + (own && "-order-1")}>
                    <div className={"p-2 rounded-xl w-auto " + (own ? "bg-white dark:bg-gray-600" : "bg-sky-500")}>
                        <p className={"text-md leading-6 " + (own ? "dark:text-white" : "text-white")}>{text}</p>
                    </div>
                    <p className="text-end truncate text-xs leading-5 text-gray-500">{format(createdAt)}</p>
                </div>
            </div>
        </>
    )
}

export default Message