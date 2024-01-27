import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUserData } from '../redux/userData/action';

export const PublicRoute = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    // const isVerified = useSelector((state) => state);
    const userData = useSelector((state) => state.userDataReducer.data);
    // console.log("auth: ", isAuthenticated, userData);
    useEffect(() => {
        if (!userData) {
            dispatch(getUserData())
            console.log("amb:: ", userData);
        }
    }, [userData])
    if (isAuthenticated) {
        if (userData?.isVerified) {
            return navigate('/home')
        } else{
            return navigate('/verifyemail')
        }
    }
    // console.log("auth: ");
    // if (isAuthorized) {
    //     return <Navigate to="/admin/" />;
    // }
    return (
        <>
            {<Outlet />}
        </>
    );
};