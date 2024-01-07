import React, { useEffect, useState } from 'react'
import Conversations from './conversations'
import ChatBox from './chatBox'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../redux/userData/action'

const Home = () => {
    const dispatch = useDispatch()
    const [openMsgs, setOpenMsgs] = useState(true)
    const userData = useSelector(state => state.userDataReducer.data)
    useEffect(() => {
        if (!userData) {
            dispatch(getUserData())
            console.log("amb:: ", userData);
        }
    }, [])


    return (
        <div className='h-screen'>
            <div className='flex gap-5 bg-slate-100 xl:h-screen h-[99vh] xl:w-screen sm:p-5 sm:pb-0 p-0 overflow-y-hidden overflow-x-auto'>
                <Conversations openMsgs={openMsgs} setOpenMsgs={setOpenMsgs} />
                <ChatBox openMsgs={openMsgs} setOpenMsgs={setOpenMsgs} />
            </div>
        </div>
    )
}

export default Home