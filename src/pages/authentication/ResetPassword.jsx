import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import loader from '../../assets/svgs/loader copy.svg'
import { emptyForgotPassword, resetPassword } from '../../redux/auth/action';
import { useNavigate, useParams } from 'react-router-dom';
import AuthHeaader from '../../components/AuthHeaader';

const ResetPassword = () => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id, token } = useParams()
    const loading = useSelector(state => state.authReducer.resetPassword.loading);
    const success = useSelector(state => state.authReducer.resetPassword.success);

    useEffect(() => {
        if (success) {
            navigate("/login");
        }
    }, [success])

    const onSubmit = (data) => {
        if (!loading) {
            dispatch(resetPassword({ id, token, password: data.password }));
        }
    };
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <AuthHeaader text={`Update password`} />

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className={`space-y-6`} onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
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
                                <span className='text-rose-500 text-sm text-sm'>{errors.password?.message}</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            <div className="mt-2">
                                <input
                                    id="c_password"
                                    name="c_password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 focus:outline-none"
                                    {...register('c_password', {
                                        required: "Confirm Password is required",
                                        validate: value =>
                                            value === watch('password') || "Confirm Password do not match the new password"
                                    })}
                                />
                                <span className='text-rose-500 text-sm text-sm'>{errors.c_password?.message}</span>
                            </div>
                        </div>

                        <div>
                            <button
                                type={"submit"}
                                className={"flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 " + (loading && "cursor-not-allowed")}
                            >
                                {loading ?
                                    <img className='h-5 w-5 m-0.5' src={loader} alt="loader" /> :
                                    <span>Update Password</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword