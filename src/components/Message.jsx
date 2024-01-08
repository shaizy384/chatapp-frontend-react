import React from 'react'
import { format } from 'timeago.js'

const Message = ({ text, createdAt, own }) => {
    return (
        <>
            <div className={"flex min-w-0 gap-x-4 my-3 mx-3 " + (own && "justify-end")}>
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                <div className="min-w-0">
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