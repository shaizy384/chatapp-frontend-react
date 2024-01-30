import React, { useEffect, useState } from 'react'
import Conversations from './conversations'
import ChatBox from './chatBox'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../redux/userData/action'

const Home = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userDataReducer.data)

    return (
        <div className='h-screen'>
            <div className='flex gap-5 bg-slate-100 dark:bg-gray-900 xl:h-screen h-[100vh] xl:w-screen sm:p-5 sm:pb-0 p-0 overflow-y-hidden overflow-x-auto'>
                <Conversations />
                <ChatBox />
            </div>
        </div>
    )
}

export default Home