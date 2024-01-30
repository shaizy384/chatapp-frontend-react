import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserData } from '../redux/userData/action';

export const PublicRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const userData = useSelector((state) => state.userDataReducer.data);
    useEffect(() => {
        if (!userData) {
            dispatch(getUserData())
        }
    }, [userData])
    if (isAuthenticated) {
        if (userData?.isVerified) {
            return navigate('/home')
        } else {
            return navigate('/verifyemail')
        }
    }
    return (
        <>
            {<Outlet />}
        </>
    );
};