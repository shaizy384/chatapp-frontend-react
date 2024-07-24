import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/logo.png'
import { useForm } from 'react-hook-form';
import loader from '../../assets/svgs/loader copy.svg'
import { forgotPassword, emptyForgotPassword } from '../../redux/auth/action';
import { useNavigate } from 'react-router-dom';
import AuthHeaader from '../../components/AuthHeaader';

const Forgot = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const loading = useSelector(state => state.authReducer.forgot.loading);
    const success = useSelector(state => state.authReducer.forgot.success);
    const forgo = useSelector(state => state.authReducer);
    console.log("forgottttttt: ", forgo);

    const handleReturn = () => {
        dispatch(emptyForgotPassword());
        navigate("/login");
    };

    const onSubmit = (data) => {
        if (!loading) {
            dispatch(forgotPassword(data));
            console.log(data.email);
        }
    };
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <AuthHeaader text={`Reset your password`} />

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">

                    <div className={`${success ? 'block' : 'hidden'}`}>
                        <p className='text-center text-gray-500 text-sm px-7'>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                        <button
                            type={"submit"}
                            onClick={handleReturn}
                            className={"mt-4 flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"}
                        >
                            <span>Return to login page</span>
                        </button>
                    </div>
                    <form className={`space-y-6 ${success && 'hidden'}`} onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder='Enter your email address'
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: emailPattern,
                                            message: 'Please enter a valid email',
                                        },
                                    })}
                                />
                                <span className='text-rose-500 text-sm'>{errors.email?.message}</span>
                            </div>
                        </div>

                        <div>
                            <button
                                type={"submit"}
                                className={"flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (loading && "cursor-not-allowed")}
                            >
                                {loading ?
                                    <img className='h-5 w-5 m-0.5' src={loader} alt="loader" /> :
                                    <span>Get Reset Password Email</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot