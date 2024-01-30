import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { loginUser } from '../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/register/action';

const AuthForm = ({ type }) => {
    const user = useSelector(state => state.authReducer)
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

    const onSubmit = (data) => {
        type === 'login' ?
            dispatch(loginUser(data)) :
            dispatch(signupUser(data));
    };
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zAZ0-9-]+(?:\.[a-zAZ0-9-]+)*$/;
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            width="40"
                            className="h-10"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className='text-3xl font-bold text-sky-400'>GalBaat</h2>
                    </div>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {type === 'login' ? "Sign in to" : "Register"} your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {type !== 'login' && <div>
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
                        </div>}
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
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none focus:outline-none"
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
                                type="submit"
                                className={"flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (loading && "cursor-not-allowed")}
                            >
                                {loading ?
                                    <svg className="animate-spin h-5 w-5 m-0.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> :
                                    (type === 'login' ? "Sign in" : "Register")
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
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
                </div>
            </div>
        </div>
    )
}

export default AuthForm