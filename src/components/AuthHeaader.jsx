import React from 'react'
import logo from '../assets/images/logo.png'

const AuthHeaader = ({ text }) => {
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center justify-center gap-2">
                    <img
                        width="40"
                        className="h-10 mr-0.5"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className='text-3xl font-bold text-sky-400'>GalBaat</h2>
                </div>
                <h2 className="mt-9 text-center text-xl font-medium leading-9 tracking-tight text-gray-900">
                    {text}
                </h2>
            </div>
        </>
    )
}

export default AuthHeaader