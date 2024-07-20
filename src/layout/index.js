import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/userData/action'

const Layout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const provider = useSelector((state) => state.authReducer.provider);
    console.log("provider", provider);
    const userData = useSelector((state) => state.userDataReducer.data);

    useEffect(() => {
        if (!userData) {
            dispatch(getUserData())
        }
    }, [userData])
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/login')
        }
        else if (isAuthenticated && userData) {
            if (userData && userData.isVerified) {
                return navigate('/')
            } else if (userData && userData.isVerified === false) {
                return navigate('/verifyemail')
            }
        }
    }, [isAuthenticated, userData])

    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout