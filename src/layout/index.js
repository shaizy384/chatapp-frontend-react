import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Login from '../pages/authentication/Login'

const Layout = () => {
    const [valid, setValid] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")
    // const token = true
    useEffect(() => {
        if (token) {
            setValid(true)
            navigate('/')
        } else if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    return (
        <>
            {valid ? <Outlet /> : <Login />}
        </>
    )
}

export default Layout