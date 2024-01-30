import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import UserListItem from './UserListItem'

const UsersList = () => {
    const listParent = useRef()
    const usersList = useSelector(state => state.conversationReducer.getConversation.data)
    return (
        <div className='overflow-auto'>
            <p className="text-md leading-5 text-gray-500 ps-6 mt-5 mb-1.5">All messages</p>
            {usersList?.length > 0 ?
                <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-600 overflow-auto" ref={listParent}>
                    {usersList?.map((c) => {
                        return <UserListItem key={c.id} {...c} />
                    })}
                </ul> :
                <span>No Friends Added!</span>
            }
        </div>
    )
}

export default UsersList