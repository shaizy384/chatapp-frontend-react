import React, { useEffect, useRef, useState } from 'react'
import defaultAvatar from '../../../assets/images/default-avatar-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { closeProfile, openChatBox } from '../../../redux/openChatBox/action';
import { getMessages, setCurrentConversation } from '../../../redux/messages/action';
import { createConversations } from '../../../redux/conversations/action';
import { uploadProfile } from '../../../redux/uploadPic/action';
import loader from '../../../assets/svgs/loader.svg'
import { useForm } from 'react-hook-form';
import { updateUser } from '../../../redux/userData/action';

const ProfileSec = () => {
    const fileInpRef = useRef()
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    // const [newData, setNewData] = useState({})
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const currentConversation = useSelector(state => state.messagesReducer.currentConversation?.data.user)
    const userData = useSelector(state => state.userDataReducer.data)
    const updateUserData = useSelector(state => state.userDataReducer?.data)
    const userDataLoading = useSelector(state => state.userDataReducer?.loading)
    // const updateUserData = useSelector(state => state.userDataReducer.updateUser?.data)
    // console.log("updateUserData: ", updateUserData);
    const usersList = useSelector(state => state.conversationReducer.getConversation.data)
    console.log("usersList: ", currentConversation, usersList);
    const imageLoading = useSelector(state => state.uploadPicReducer.uploadPic?.loading)
    const imageURL = useSelector(state => state.uploadPicReducer.uploadPic?.data)

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

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        setValue("name", userData?.name)
        setValue("email", userData?.email)
        // setValue("password", userData?.password)
    }, [userData.email, userData.name])

    useEffect(() => {
        imageURL && setImage(imageURL)
    }, [imageURL])

    useEffect(() => {
        userData?.photoURL && setImage(userData?.photoURL)
    }, [userData?.photoURL])

    const handleFile = (e) => {
        console.log(e.target.files[0])
        const pic = e.target.files[0]
        if (pic && (pic.type === "image/jpeg" || pic.type === "image/png")) {
            const data = new FormData();
            data.append("file", pic)
            data.append("upload_preset", "galbaat-chat-app")
            data.append("cloud_name", "shaizycreation")
            // data.append("file", pic)
            dispatch(uploadProfile(data))
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setValue("name", userData?.name)
        setValue("email", userData?.email)
        setImage(userData?.photoURL ? userData?.photoURL : null)
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        const isVerified = (userData.email !== data?.email) ? false : true
        if (isVerified && (data.name !== userData.name) && (image !== userData.photoURL)) return true;
        console.log("data: ", { ...data, image, isVerified }, userData);

        const updatedData = { ...data, photoURL: image, isVerified }
        dispatch(updateUser(updatedData))

        // imageURL && imageURL !== currentConversation.photoURL && setNewData({ ...newData, photoURL: imageURL })
        // Object.keys(data).forEach((field, key) => {
        //     if (data[field] !== currentConversation[field]) {
        //         setNewData({ ...newData, [field]: data[field] })
        //         console.log("Different: ", data[field], key, field, newData);
        //     } else {
        //         console.log("Same: ", data[field]);
        //     }
        // });

        // newData &&
        // dispatch(updateUser(newData))
        // console.log("newData: ", data);
        // const { email, name } = data
        // if (email !== currentConversation?.email || name !== currentConversation?.name || currentConversation.photoURL !== imageURL) {
        //     console.log("updated: ", data);
        //     dispatch(updateUser(data))
        // }
        // if (!loading) {
        //     dispatch(setProvider("custom"))
        //     type === 'login' ?
        //         dispatch(loginUser(data)) :
        //         dispatch(signupUser(data));
        // }
    };
    return (
        <div className='w-full sm:rounded-t-2xl shadow bg-sky-50 dark:bg-gray-800 relative flex flex-col items-center justify-center'>
            {/* <>
                <div className='ps-9 sm:hidden block'>
                    <button className='sm:hidden flex items-baseline border-transparent text-gray-800 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 rounded group' onClick={() => dispatch(closeProfile())}>
                        <i className="fa-solid fa-arrow-left fa-sm animate-bounce ps-0.5 group-hover:ps-0 group-hover:pe-0.5"></i>
                        <span className='ps-1.5 font-semibold'>Back</span>
                    </button>
                </div>
                <div className='flex-1 grow flex items-center justify-center p-4 dark:border-gray-600'>
                    <div className="flex flex-col">
                        <img className='h-28 w-28 mb-3 rounded-full' src={!imageURL ? (currentConversation?.photoURL ? currentConversation?.photoURL : defaultAvatar) : imageURL} alt="profile-pic" />
                        <button htmlFor="file-upload" type="button" className={`rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${imageLoading && " opacity-60 cursor-not-allowed"}`} onClick={() => !imageLoading && fileInpRef.current.click()}>Change</button>
                        <input id="file-upload" name="file-upload" type="file" accept='image/*' className="sr-only" ref={fileInpRef} onChange={handleFile} />
                    </div>
                    <div className='flex-1 grow flex flex-col items-center justify-center p-4 dark:border-gray-600'>
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
            </> */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm px-8 w-full">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Uplload Photo */}
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Photo</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            {image ?
                                <img src={image} className='h-24 w-24 rounded-full' alt="user_profile" /> :
                                <svg className="h-24 w-24 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>}
                            <button htmlFor="file-upload" type="button" className={`rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${imageLoading && " opacity-60 cursor-not-allowed"}`} onClick={() => !imageLoading && fileInpRef.current.click()}>
                                Change
                                {/* {!imageLoading ?
                                            <img className='h-5 w-5 m-0.5 text-yellow-500' src={loader} alt="loader" /> :
                                            "Change"
                                        } */}
                            </button>
                            <input id="file-upload" name="file-upload" type="file" accept='image/*' className="sr-only" ref={fileInpRef} onChange={handleFile} />
                        </div>
                    </div>

                    {/* <div className='flex flex-col space-y-6'> */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Full Name</label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none"
                                {...register('name', {
                                    required: "Name is required"
                                })}
                            />
                            <span className='text-rose-500'>{errors.name?.message}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none"
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: emailPattern,
                                        message: 'Please enter a valid email',
                                    },
                                })}
                            />
                            <span className='text-rose-500'>{errors.email?.message}</span>
                        </div>
                    </div>
                    {/* <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none"
                            // {...register('password', {
                            // required: "Password is required",
                            // minLength: {
                            //     value: 8,
                            //     message: "Password must be atleast 8 characters"
                            // }
                            // })}
                            />
                            <span className='text-rose-500'>{errors.password?.message}</span>
                        </div>
                    </div> */}

                    <div className='flex gap-3 mt-16 pt-2'>
                        <button
                            onClick={handleCancel}
                            className={"flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 " + (userDataLoading && "cursor-not-allowed opacity-60")}
                        >Cancel</button>
                        <button
                            type={"submit"}
                            className={"flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (userDataLoading && "cursor-not-allowed")}
                        >
                            {userDataLoading ?
                                <img className='h-5 w-5 m-0.5' src={loader} alt="loader" /> :
                                "Update"
                            }
                        </button>
                    </div>
                    {/* </div> */}
                </form>
            </div>
        </div>
    )
}

export default ProfileSec