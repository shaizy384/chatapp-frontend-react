import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../../redux/auth/action'
import { useNavigate } from 'react-router-dom'
import { chatListFilter, getConversations } from '../../../redux/conversations/action'

const Conversations = ({ openMsgs, setOpenMsgs }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [theme, setTheme] = useState(null)
    const userData = useSelector(state => state.userDataReducer.data)
    const chatList = useSelector(state => state.conversationReducer.getConversation.data)
    const [showOpt, setShowOpt] = useState(false)
    const openChatBox = useSelector(state => state.chatBoxReducer.open)

    console.log("chatList ", chatList);
    useEffect(() => {
        if (!chatList) {
            dispatch(getConversations())
        }
    }, [])


    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme:dark)'.match)) {
            // console.log("hello:", window.matchMedia('(prefers-color-scheme: dark)'.match))
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [])

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark')
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        }
    }, [theme])

    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const logout = () => {
        dispatch(Logout())
        navigate("/login")
    }
    const handleChange = (e) => {
        dispatch(chatListFilter(e.target.value))
        // console.log(e.target.value);
    }
    const handleSearch = () => {
        // dispatch(chatListFilter(search))
        console.log(search);
    }
    return (
        <div className={(openChatBox && 'hidden') + ' flex sm:flex sm:w-[18rem] w-full bg-white dark:bg-gray-800 sm:rounded-t-2xl shadow flex-col h-full'}>
            <div className="flex justify-between items-center gap-x-6 py-6 px-5">
                <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold leading-6 text-gray-900 dark:text-white truncate">{userData?.name}</p>
                        <p className="mt-1 truncate text-md leading-5 text-gray-500 dark:text-gray-400">Info Account</p>
                    </div>
                </div>

                <div className="dropdown-options relative">
                    <button id="dropdownMenuIconButton" data-dropdown-offset-distance="5" data-dropdown-offset-skidding="-70" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100  ring-1 ring-inset ring-gray-300 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setShowOpt(!showOpt)}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div id="dropdownDots" className={"absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700 dark:divide-gray-600 " + (!showOpt && "hidden")}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <button className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleTheme}>Dark Mode</button>
                            </li>
                        </ul>
                        <div className="py-2">
                            <span onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Sign out</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Search Input */}
            <div className="relative px-5">
                <div className="absolute inset-y-0 start-0 flex items-center ps-[2.125rem] pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-gray-400 cursor-pointer"></i>
                </div>
                <input type="text" id="search" onChange={e => { setSearch(e.target.value); console.log(search.length); }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 focus-visible:outline-none" placeholder="Search by email" />
                <div class={"absolute inset-y-0 right-0 items-center pe-[2.125rem] flex " + (search.length === 0 && "hidden")}>
                    <i className="fa-solid fa-arrow-right text-gray-400 cursor-pointer" onClick={handleSearch}></i>
                </div>
            </div>

            <div className='bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-2 mx-5 mt-3'>
                <ul className="flex justify-between">
                    <li>
                        <input type="radio" id="all" name="chat-filter" value="all" className="hidden peer" defaultChecked="checked" onChange={handleChange} />
                        <label htmlFor="all" className="inline-flex items-center justify-between w-full px-5 py-1.5 text-gray-500 peer-checked:bg-white peer-checked:shadow rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:bg-gray-800 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700">
                            All
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="active" name="chat-filter" value="active" className="hidden peer" onChange={handleChange} />
                        <label htmlFor="active" className="inline-flex items-center justify-between w-full px-5 py-1.5 text-gray-500 peer-checked:bg-white peer-checked:shadow rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:bg-gray-800 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700">
                            Active
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="unread" name="chat-filter" value="unread" className="hidden peer" onChange={handleChange} />
                        <label htmlFor="unread" className="inline-flex items-center justify-between w-full px-5 py-1.5 text-gray-500 peer-checked:bg-white peer-checked:shadow rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:bg-gray-800 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700">
                            Unread
                        </label>
                    </li>
                </ul>
            </div>
            {/* </div> */}
            <ChatList />
        </div>
    )
}

export default Conversations