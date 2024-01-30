import React from 'react'
import Conversations from './conversations'
import ChatBox from './chatBox'

const Home = () => {
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