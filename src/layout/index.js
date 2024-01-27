import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Login from '../pages/authentication/Login'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/userData/action'

const Layout = () => {
    // const [valid, setValid] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const token = localStorage.getItem("authToken")
    // const user = useSelector(state => state.authReducer)
    // console.log("user: ", user);
    // if (user.isAuthenticated) {
    //     console.log("user amb");
    //     user.isVerified ?
    //         navigate('/') :
    //         navigate('/verifyemail')
    // }
    // console.log("user: ");
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
    const userData = useSelector((state) => state.userDataReducer.data);
    console.log("userdata verify", userData);
    console.log(isAuthenticated);
    useEffect(() => {
        if (!userData) {
            dispatch(getUserData())
            console.log("amb:: ", userData);
        }
    }, [userData])
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/login')
        }
        else if (isAuthenticated) {
            if (userData?.isVerified) {
                return navigate('/')
            } else {
                return navigate('/verifyemail')
            }
        }
    }, [isAuthenticated, userData?.isVerified])
    // const userData = useSelector((state) => state.userDataReducer.data);
    // useEffect(() => {
    //     if (!userData) {
    //         dispatch(getUserData())
    //         // console.log("amb:: ", userData);
    //     }
    // }, [])
    // useEffect(() => {
    //     if (token) {
    //         setValid(true)
    //         navigate('/')
    //     } else if (!token) {
    //         navigate('/login')
    //     }
    // }, [token, navigate])
    // if (isAuthenticated) {
    //     return navigate('/')
    // }

    return (
        <>
            {/* {valid ? <Outlet /> : <Login />} */}
            <Outlet />
        </>
    )
}

export default Layout