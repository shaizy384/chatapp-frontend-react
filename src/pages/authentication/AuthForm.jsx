import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { loginUser, setProvider } from '../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, uploadProfile } from '../../redux/register/action';
import logo from '../../assets/images/logo.png'
import google from '../../assets/images/google.png'
import facebook from '../../assets/images/facebook.png'
import loader from '../../assets/svgs/loader copy.svg'

const AuthForm = ({ type }) => {
    const fileInpRef = useRef()
    const user = useSelector(state => state.authReducer)
    const imageLoading = useSelector(state => state.uploadPicReducer.uploadPic?.loading)
    const imageURL = useSelector(state => state.uploadPicReducer.uploadPic?.data)
    console.log(imageLoading, imageURL);
    const dispatch = useDispatch()
    let loading;
    let state = useSelector(state => state);
    if (type !== 'login') {
        loading = state.signupReducer.loading
    } else {
        loading = state.authReducer.loading
    }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

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

    const onSubmit = (data) => {
        if (!loading) {
            dispatch(setProvider("custom"))
            type === 'login' ?
                dispatch(loginUser(data)) :
                dispatch(signupUser(data));
        }
    };
    const handleGoogle = () => {
        const google = window.open("http://localhost:2800/auth/google/", "_self")
        console.log("google login: ", google);
        dispatch(setProvider("google"))
        localStorage.setItem("provider", "google")
    }
    const handleFacebook = () => {
        dispatch(setProvider("facebook"))
        localStorage.setItem("provider", "google")
        window.open("http://localhost:2800/auth/facebook/", "_self")
    }
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zAZ0-9-]+(?:\.[a-zAZ0-9-]+)*$/;
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                    <h2 className="mt-9 text-start text-xl font-medium leading-9 tracking-tight text-gray-900">
                        {type === 'login' ? "Sign in to" : "Register"} your account
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {type !== 'login' && <>
                            {/* Uplload Photo */}
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {imageURL ?
                                        <img src={imageURL} className='h-14 w-14 rounded-full' alt="user_profile" /> :
                                        <svg className="h-14 w-14 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
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
                        </>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
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
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                {type === 'login' && <div className="text-sm">
                                    <a href="#" className="font-semibold text-sky-400 hover:text-sky-500">
                                        Forgot password?
                                    </a>
                                </div>}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none"
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be atleast 8 characters"
                                        }
                                    })}
                                />
                                <span className='text-rose-500'>{errors.password?.message}</span>
                            </div>
                        </div>

                        <div>
                            <button
                                type={"submit"}
                                className={"flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (loading && "cursor-not-allowed")}
                            >
                                {loading ?
                                    <img className='h-5 w-5 m-0.5' src={loader} alt="loader" /> :
                                    (type === 'login' ? "Sign in" : "Register")
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-3 mb-8 text-center text-sm text-gray-500">
                        {type === 'login' ? <>
                            Not a member?{' '}
                            <Link to="/register" className="font-semibold leading-6 text-sky-400 hover:text-sky-500">
                                Register
                            </Link>
                        </> : <>
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold leading-6 text-sky-400 hover:text-sky-500">
                                Sign in
                            </Link>
                        </>
                        }
                    </p>
                    <div className="">
                        <div className="flex items-center text-sm text-gray-500">
                            <hr className='w-full' />
                            <span className='whitespace-nowrap mx-2'>or continue with</span>
                            <hr className='w-full' />
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button
                                type="submit"
                                onClick={handleGoogle}
                                className={"flex items-center w-full justify-center rounded-md bg-transparent px-3 py-2 font-semibold leading-6 border shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (loading && "cursor-not-allowed")}
                            >
                                <div className="flex items-center">
                                    <img src={google} width={20} alt="google" />
                                    <span className='ml-2 text-gray-900'>Google</span>
                                </div>
                            </button>
                            <button
                                type="submit"
                                onClick={handleFacebook}
                                className={"flex items-center w-full justify-center rounded-md bg-transparent px-3 py-2 text- font-semibold leading-6 border text- shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (loading && "cursor-not-allowed")}
                            >
                                <div className="flex items-center">
                                    <img src={facebook} width={20} alt="facebook" />
                                    <span className='ml-2 text-gray-900'>Facebook</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm