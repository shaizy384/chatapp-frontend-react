import React, { useState } from 'react'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { createConversations, findFriend } from '../../../redux/conversations/action'
import { openChatBox } from '../../../redux/openChatBox/action'
import { getMessages, setCurrentConversation } from '../../../redux/messages/action'

const FindUser = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const searchedUser = useSelector(state => state.conversationReducer.findFriend.data)
    const searchLoader = useSelector(state => state.conversationReducer.createConversation.loading)
    console.log("searchLoader: ", searchLoader);
    console.log("searchedUser: ", searchedUser);
    const handleSearch = () => {
        dispatch(findFriend(search))
        console.log(search);
    }
    const handleSearchedUser = () => {
        dispatch(openChatBox())
        dispatch(createConversations({ senderId: searchedUser._id }))
        console.log("searchedUser._id:, ", searchedUser._id);
        // dispatch(emptyFindFriend())
        console.log("searchedUser: ", searchedUser._id);
        
        // for loading messages 
        // dispatch(getMessages(_id))
        // dispatch(setCurrentConversation({ conversationId: _id, members }))
    }
    return (
        <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 dark:bg-gray-800 relative flex flex-col pt-4'>
            <div className="relative px-5 w-full h-fit">
                <div className={"absolute inset-y-0 start-0 flex items-center ps-[2.625rem] pointer-events-none " + (search.length !== 0 && " hidde")}>
                    <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                </div>
                <div className={"dark:bg-gray-700 bg-white rounded-t-lg border-b-2 dark:border-gray-600 p-2 shadow-md " + (!searchedUser && "rounded-b-lg")}>
                    <input type="text" id="search" value={search} onChange={e => { setSearch(e.target.value); console.log(search.length); }} className="bg-white bg-[#E8F0FE border border-gray-300 text-gray-900 text-sm rounded-lg border-transparent block w-full ps-10 pe-4 p-2.5 dark:bg-gray-700 dark:border-gray-60 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-transparent focus-visible:outline-none" placeholder="Search by email" />
                </div>
                <div className={"absolute inset-y-0 right-0 items-center pe-[2.125rem] flex " + (!search && "hidden")}>
                    <i className="fa-solid fa-arrow-right text-sky-400 cursor-pointer" onClick={handleSearch}></i>
                </div>
                {/* <!-- Search Dropdown --> */}
                {searchedUser &&
                    <>
                        <div id="dropdownDots" className={"flex jus absolute right-0 z-10 bg-white rounded-b-lg shadow-md dark:bg-gray-700 mx-5 w-[-webkit-fill-available]"}>
                            <ul className="flex-1 grow py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                {/* <span className='px-5 py-1 text-gray-400 block text-sm pb-'>Recent Search</span> */}
                                <li>
                                    <button className="flex items-center gap-2 px-5 py-2 w-ful hover:bg-gray-100 w-[-webkit-fill-available] dark:hover:bg-gray-600 dark:hover:text-white text-lg">
                                        <img className="h-8 w-8 flex-none rounded-full bg-gray-50" src={defaultAvatar} alt="defaultAvatar" />
                                        <span>{searchedUser?.name}</span>
                                        <i class="fa-solid fa-angle-right ml-auto text-gray-400"></i>
                                    </button>
                                </li>
                            </ul>
                            <div className='flex-1 grow flex flex-col items-center justify-center gap-1 p-4 border-l-2 dark:border-gray-600'>
                                <img className='h-14 w-14' src={defaultAvatar} alt="" />
                                <h1 className='font-semibold text-lg dark:text-white mb-'>{searchedUser?.name}</h1>
                                <div className="flex flex-c mb-5">
                                    <p className='text-gray-800 dark:text-gray-400'>{searchedUser?.email}</p>
                                </div>
                                <div>
                                    <button type="submit" className={"flex w-full justify-center rounded-md bg-transparent text-sky-400 border-2 transition-all border-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-sky-400"} onClick={handleSearchedUser}>
                                        {searchLoader ?
                                            <svg className="animate-spin h-5 w-5 m-0.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> :
                                            <span>Add to Contacts</span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            {searchedUser === "" && <div className="flex justify-center items-center grow">
                <div className="flex flex-col items-center">
                    <i class="fa-solid fa-user-group fa-xl mb-3 text-gray-500"></i>
                    <h1 className='font-medium text-lg mt-2 pb-1 text-gray- dark:text-white'>No people found</h1>
                    <p className='text-gray-500 dark:text-gray-400'>We couldn’t find anything with that email. Please try again.</p>
                </div>
            </div>}
        </div>
    )
}

export default FindUser