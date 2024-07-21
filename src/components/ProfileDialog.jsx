import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createConversations } from '../redux/conversations/action';
import { getMessages, setCurrentConversation } from '../redux/messages/action';
import { openChatBox } from '../redux/openChatBox/action';
import defaultAvatar from '../assets/images/default-avatar-icon.png'

const ProfileDialog = () => {
    const [showDialog, setShowDialog] = useState(false);
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
            if (!ownConv[0]) {
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
        <>
            <button onClick={() => setShowDialog(true)} className=" w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg dark:hover:text-white">View Profile</button>
            {showDialog && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                {/* <!--
                Background backdrop, show/hide based on modal state.

                Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
                --> */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* <!--
                        Modal panel, show/hide based on modal state.

                        Entering: "ease-out duration-300"
                        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        To: "opacity-100 translate-y-0 sm:scale-100"
                        Leaving: "ease-in duration-200"
                        From: "opacity-100 translate-y-0 sm:scale-100"
                        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        --> */}
                        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-whit px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
                                <button className="absolute right-4 ml-auto bg-transparent border-0 text-sky-400  float-right text-xl leading-none font-semibold outline-none focus:outline-none -mt-2 -mr-1" onClick={() => setShowDialog(false)}
                                >
                                    <span className="bg-transparent text-sky-400 h-6 w-6 text-2xl block outline-none focus:outline-none  leading-none">×</span>
                                </button>
                                {/* <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Deactivate account</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                                        </div>
                                    </div>
                                </div> */}

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
                            {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ProfileDialog