import axios from 'axios'
import React from 'react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../pages/_app'
import { useRouter } from 'next/router'
import RenderDashboard from './ImageView/RenderFilterView'

function Homepage() {
    const applicationContext = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        const verifyToken = async () => {
            if (localStorage.getItem("session") == null) {
                router.push('/auth')
                console.log("Session not found")
                return false
            }
            let tokenBody = JSON.parse(localStorage.getItem("session"))
            let response = await axios.post("/api/auth/verify", { token: tokenBody })
                .then(async res => {
                    console.log("authenticated")
                    applicationContext.authDispatch({ type: 'AUTHENTICATED' })
                    return res.data
                })
                .catch(err => {
                    console.log("session expired")
                    router.push('/auth')
                })
            return response
        }
        verifyToken()
    }, [])
    return (
        <>
        <RenderDashboard />
        </>
        
    )
}

export default Homepage