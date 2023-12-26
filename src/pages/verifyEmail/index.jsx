import React from 'react'
import art from '../../assets/images/man-mobile-illustration.png'

const VerifyEmail = () => {
  return (
    <>
      <main className="grid h-screen place-items-center bg-white">
        <div className="flex flex-col text-center">
          <p className="text-base font-semibold text-indigo-600">401</p>
          <div className="mx-auto">
            <img className='mx-auto my-5' src={art} width={400} alt="" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Email Verification Required</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Please check your email account and click on the link to activate your account.<br />If you don't see an email in your inbox, check your spam mail folder.</p>
        </div>
      </main>
    </>
  )
}

export default VerifyEmail
