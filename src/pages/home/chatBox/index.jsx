import React, { useEffect, useRef, useState } from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import Message from '../../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { callApi } from '../../../apis/APIs'
import { addMessage, setArrivalMessage } from '../../../redux/messages/action'
import { io } from 'socket.io-client'
import { setOnlineFriends } from '../../../redux/onlineFriends/action'

const ENDPOINT = "http://localhost:2801"    // backend_host

const ChatBox = ({ openMsgs, setOpenMsgs }) => {
    const socket = useRef()
    const scrollRef = useRef()
    const dispatch = useDispatch()
    const [newMessage, setNewMessage] = useState("")
    // const [socket, setSocket] = useState(null)
    const openChatBox = useSelector(state => state.chatBoxReducer?.open)
    let messages = useSelector(state => state.messagesReducer.getMessage?.data)
    let currentConversation = useSelector(state => state.messagesReducer.currentConversation?.data)
    const userId = useSelector(state => state.userDataReducer?.data?._id)
    // const members = useSelector(state => state.conversationReducer.getConversation.data)
    // console.log("currentConversation:: ", currentConversation);
    // console.log("messages:: ", messages, userId);

    // socket io
    useEffect(() => {
        socket.current = io(ENDPOINT)
        socket.current.on("getMessage", data => {
            const { senderId, text } = data
            dispatch(setArrivalMessage({ senderId, text, createdAt: Date.now() }))
        })
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", userId)
        socket.current.on("getUsers", users => {
            console.log("users: ", users);
            dispatch(setOnlineFriends(users))
        })
    }, [socket, userId])

    // useEffect(() => {
    //     // socket?.on("welcome", message => {
    //     //     console.log("socket message: ", message);
    //     // })
    //     socket.emit("addUser", userId)
    // }, [socket])
    console.log(socket);
    const handleSend = async () => {
        const receiverId = currentConversation.members?.find(member => member !== userId)
        socket.current.emit("sendMessage", { senderId: userId, receiverId, text: newMessage })

        const message = { conversationId: currentConversation.conversationId, senderId: userId, text: newMessage }
        dispatch(addMessage(message))
        setNewMessage("")
    }

    // scroll to last message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {!openChatBox ? <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 relative hidden sm:flex justify-center items-center'>
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