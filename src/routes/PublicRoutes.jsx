import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserData } from '../redux/userData/action';
import axios from 'axios';

export const PublicRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const provider = useSelector((state) => state.authReducer.provider);
    console.log("provider", provider);
    const userData = useSelector((state) => state.userDataReducer.data);
    useEffect(() => {
        if (isAuthenticated && !userData) {
            dispatch(getUserData())
        }
    }, [userData])
    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await axios.get("http://localhost:2800/auth/login/success",
                    { withCredentials: true }
                );
                console.log("g user data", data.data.auth);
                localStorage.setItem("authToken", data.data.auth);
                return data;
            } catch (err) {
                return console.error(err);
            }
        }
        (provider !== "custom") && getUser()


        if (isAuthenticated) {
            if (userData && userData.isVerified) {
                return navigate('/')
            } else if (userData && !userData.isVerified) {
                return navigate('/verifyemail')
            }
        }
    }, [])
    if (isAuthenticated) {
        if (userData && userData.isVerified) {
            return navigate('/')
        } else if (userData && !userData.isVerified) {
            return navigate('/verifyemail')
        }
    }
    return (
        <>
            {<Outlet />}
        </>
    );
};