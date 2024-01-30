import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openChatBox } from '../../../redux/openChatBox/action'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import UserListItem from './UserListItem'

const UsersList = () => {
    const listParent = useRef()
    // const [listPar, setListPar] = useState(listParent.current)
    const usersList = useSelector(state => state.conversationReducer.getConversation.data)
    const findFriend = useSelector(state => state.conversationReducer.findFriend.data)
    console.log("usersList amb er: ", usersList);
    console.log("findFriend: ", findFriend);
    const people = [
        {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            role: 'Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
        {
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            role: 'Director of Product',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
    ]

    console.log("usersList ", usersList);
    return (
        <div className='overflow-auto'>
            <p className="text-md leading-5 text-gray-500 ps-6 mt-5 mb-1.5">All messages</p>
            {usersList?.length > 0 ?
                <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-600 overflow-auto" ref={listParent}>
                    {usersList?.map((c) => {
                        console.log("members[1]: ", c.members[1])
                        // console.log("search list: ", usersList, listParent.current?.textContent.trim().length)
                        return <UserListItem key={c.id} {...c} />
                    })}
                </ul> :
                <span>No Friends Added!</span>
            }
            {/* {(listParent.current?.textContent.trim().length === 0) &&
                <span>No User Found!</span>
            } */}
            {/* {console.log("search list amb: ", listPar,listPar?.getElementsByTagName("li"), listParent?.current?.textContent.trim().length)} */}
        </div>
    )
}

export default UsersList