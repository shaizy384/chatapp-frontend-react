import React, { useEffect, useRef, useState } from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import Message from '../../../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, getMessages, setArrivalMessage, setCurrentConversation, setTypers } from '../../../redux/messages/action'
import { io } from 'socket.io-client'
import { setOnlineFriends, updateConversation, updateLastMsg } from '../../../redux/conversations/action'
import FindUser from './FindUser'
import waving from '../../../assets/images/waving.gif'
import ProfileSec from './ProfileSec'
import addNotification from 'react-push-notification'
import logo from '../../../assets/images/logo.png'
import { openChatBox } from '../../../redux/openChatBox/action'
import LoadingMessage from '../../../components/LoadingMessage'

const ENDPOINT = process.env.REACT_APP_BACKEND_HOST // backend_host

const ChatBox = () => {
    const socket = useRef()
    const scrollRef = useRef()
    const dispatch = useDispatch()
    const [typing, setTyping] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMsg, setArrivalMsg] = useState("")
    const [typingTimeout, setTypingTimeout] = useState("")
    // const typingTimeout = useRef(null);
    const showChatBox = useSelector(state => state.chatBoxReducer.chatBox.open)
    const searchFriendBox = useSelector(state => state.chatBoxReducer.searchFriendBox.open)
    const profileSec = useSelector(state => state.chatBoxReducer.profileSec.open)
    let messages = useSelector(state => state.messagesReducer.getMessage?.data)
    let currentConversation = useSelector(state => state.messagesReducer.currentConversation?.data)
    const userData = useSelector(state => state.userDataReducer?.data)
    const userId = useSelector(state => state.userDataReducer?.data?._id)
    // console.log(currentConversation);
    const usersList = useSelector(state => state.conversationReducer.getConversation.data)
    const onlineFriends = useSelector(state => state.conversationReducer.setOnlineFriends?.data)
    const online = onlineFriends?.filter(u => u.userId === currentConversation?.user._id).length === 1
    const typers = useSelector(state => state.messagesReducer.setTypers?.data)
    const isTyping = typers?.filter(t => (t.userId === currentConversation?.user._id) && t.conversationId === currentConversation.conversationId && t.typing).length > 0

    // socket io
    useEffect(() => {
        console.log("useEffect currentConversation socket: ", currentConversation);
        socket.current = io(ENDPOINT, {
            // WARNING: in that case, there is no fallback to long-polling
            transports: ["websocket", "polling"]
            // transports: ["websocket"] // or [ "websocket", "polling" ] (the order matters)
        })
        socket.current.on("getMessage", data => {
            const { senderId, text, conversationId, unseen_msgs } = data
            setArrivalMsg({ senderId, text, createdAt: Date.now(), conversationId, unseen_msgs })
        })
    }, [])

    useEffect(() => {
        socket.current.on("getTypers", typers => {
            console.log("typers: ", typers);
            dispatch(setTypers(typers))
        })
    }, [])

    useEffect(() => {
        if (currentConversation?.members?.includes(arrivalMsg?.senderId)) {
            dispatch(setArrivalMessage(arrivalMsg))
        } else {
            if (arrivalMsg?.text) {
                console.log("arrivalMsgarrivalMsg : ", arrivalMsg);
                const upConversation = { receiverId: userId, last_message: arrivalMsg?.text, unseen_msgs: arrivalMsg?.unseen_msgs, _id: arrivalMsg?.conversationId }

                dispatch(updateConversation(upConversation))
                addNotification({
                    title: "New message received",
                    message: arrivalMsg?.text,
                    duration: 4000,
                    icon: logo,
                    native: true,
                    onClick: () => {
                        dispatch(openChatBox())
                        const ownConv = usersList.filter(e => e.members[1] === arrivalMsg?.senderId)
                        dispatch(getMessages(ownConv[0]._id))
                        dispatch(setCurrentConversation({ conversationId: ownConv[0]._id, members: ownConv[0].members, user: userData }))
                    }
                })
            }
        }
    }, [arrivalMsg])
    console.log("userData userData userData: ", userData);
    useEffect(() => {
        console.log("onlineFriends onlineFriends onlineFriends: ", onlineFriends);
    }, [onlineFriends])

    useEffect(() => {
        if (!userId) return;
        socket.current.emit("addUser", userId)
        socket.current.on("getUsers", users => {
            dispatch(setOnlineFriends(users))
        })
    }, [socket, userId])

    const handleChange = (e) => {
        const timeLength = 1500;
        setNewMessage(e.target.value)
        const stopTypingTime = () => {
            setTyping(false)
            socket.current.emit("stop typing", userId, currentConversation.conversationId)
        }

        // handle typing
        if (!typing) {
            setTyping(true)
            socket.current.emit("typing", userId, currentConversation.conversationId)
            setTypingTimeout(setTimeout(stopTypingTime, timeLength));
        } else {
            clearTimeout(typingTimeout)
            setTypingTimeout(setTimeout(stopTypingTime, timeLength));
        }
    }

    const handleSend = async () => {
        // currentConversation.last_message = newMessage
        dispatch(updateLastMsg({ message: newMessage, _id: currentConversation?.conversationId }))
        const receiverId = currentConversation.members?.find(member => member !== userId)
        console.log("currentConversationcurrentConversation : ", currentConversation);
        socket.current.emit("sendMessage", {
            senderId: userId, receiverId, text: newMessage, conversationId: currentConversation?.conversationId, unseen_msgs: currentConversation?.unseen_msgs ? (currentConversation?.unseen_msgs + 1) : 1
        })
        const message = { conversationId: currentConversation.conversationId, senderId: userId, text: newMessage }
        // const up = {receiverId,las}
        dispatch(addMessage(message))
        setNewMessage("")
    }

    // scroll to last message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {profileSec && <ProfileSec />}
            {searchFriendBox && <FindUser />}
            {(!showChatBox && !searchFriendBox && !profileSec) && <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 dark:bg-gray-800 relative hidden sm:flex justify-center items-center'>
                <div className='text-center'>
                    <span className='text-lg mb-4 dark:text-white'>Open a converation to start a chat</span><br />
                    <span className='text-sm dark:text-white'>🔒Your personel messages are secured</span>
                </div>
            </div>}
            {showChatBox && <div className={'flex flex-col w-full sm:rounded-t-2xl shadow bg-sky-50 dark:bg-gray-800 relative'}>
                <ChatBoxHeader online={online} isTyping={isTyping} />
                {messages?.length > 0 ?
                    <div className="overflow-y-auto">
                        {messages?.map(msg => (
                            <div ref={scrollRef}>
                                <Message id={msg.id} {...msg} own={userId === msg.senderId} />
                            </div>
                        ))}
                        {isTyping && <LoadingMessage />}
                    </div> :
                    <div className="flex flex-col grow items-center justify-center">
                        <img src={waving} alt="waving" className='-rotate-12' width={65} />
                        <span className='dark:text-gray-400 text-xl font-medium'>Say Hello!</span>
                    </div>
                }
                <div className='mt-auto w-full bg-white dark:bg-gray-800 p-3'>
                    <div className="flex items-center">
                        <i className="fa-regular fa-face-smile fa-xl text-gray-500 cursor-pointer"></i>
                        <input
                            type="text"
                            name="message"
                            id="message"
                            value={newMessage}
                            onChange={handleChange}
                            placeholder="Try something..."
                            className="block w-full rounded-md border-0 py-1.5 px-3.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus-visible:outline-none ms-3 me-1 dark:bg-gray-600 dark:ring-gray-500 dark:text-white"
                        />
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm py-3 px-4 text-center inline-flex items-center mr-2 dark:bg-sky-500 dark:hover:bg-sky-700 dark:focus:ring-blue-800" onClick={handleSend}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div >}
        </>
    )
}

export default ChatBox