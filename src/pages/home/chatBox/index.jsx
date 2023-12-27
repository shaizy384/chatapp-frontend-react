import React, { useEffect, useRef, useState } from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import Message from '../../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { callApi } from '../../../apis/APIs'
import { addMessage } from '../../../redux/messages/action'

const ChatBox = ({ openMsgs, setOpenMsgs }) => {
    const scrollRef = useRef()
    const dispatch = useDispatch()
    const [newMessage, setNewMessage] = useState("")
    const openChatBox = useSelector(state => state.chatBoxReducer?.open)
    let messages = useSelector(state => state.messagesReducer.getMessage?.data)
    let conversationId = useSelector(state => state.messagesReducer.conversationId?.data)
    console.log("conversationId:: ", conversationId);
    const userId = useSelector(state => state.userDataReducer?.data?._id)
    console.log("messages:: ", messages, userId);
    const msgs = [
        {
            id: 1,
            msg: "Hello",
            time: "8:29 am",
            own: false
        },
        {
            id: 2,
            msg: "Hi, How're you?",
            time: "8:29 am",
            own: true
        },
        {
            id: 3,
            msg: "I'm good. What about you?",
            time: "8:29 am",
            own: false
        },
    ]
    const handleSend = async () => {
        const message = { conversationId: conversationId, senderId: userId, text: newMessage }
        console.log(newMessage, message);
        dispatch(addMessage(message))
        setNewMessage("")
    }

    // scroll to last message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {!openChatBox ? <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 relative flex justify-center items-center'>
                <div className='text-center'>
                    <span className='text-lg mb-4'>Open a converation to start a chat</span><br />
                    <span className='text-sm'>🔒Your personel messages are end to end encrypted</span>
                </div>
            </div> :
                <div className={(!openChatBox && 'hidden') + ' flex flex-col w-full sm:rounded-t-2xl shadow bg-sky-50 relative'}>
                    <ChatBoxHeader />
                    <div className="overflow-y-auto">
                        {messages?.map(msg => (
                            <div ref={scrollRef}>
                                <Message id={msg.id} {...msg} own={userId === msg.senderId} />
                            </div>
                        ))}
                    </div>
                    <div className='mt-auto w-full bg-white p-3'>
                        <div className="flex items-center">
                            <i className="fa-regular fa-face-smile fa-xl text-gray-500 cursor-pointer"></i>
                            <input
                                type="text"
                                name="message"
                                id="message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Try something..."
                                className="block w-full rounded-md border-0 py-1.5 px-3.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-none ms-3 me-1"
                            />
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm py-3 px-4 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSend}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatBox