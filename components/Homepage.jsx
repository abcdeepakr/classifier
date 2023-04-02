import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../pages/_app'
import { useRouter } from 'next/router'
import RenderDashboard from './ImageView/RenderFilterView'

function Homepage() {
    const applicationContext = useContext(AppContext)
    const router = useRouter()
    const [authLoading, setAuthLoading] = useState(true)
    useEffect(() => {
        const verifyToken = async () => {
            if (localStorage.getItem("session") == null) {
                router.push('/auth')
                return false
            }
            let tokenBody = JSON.parse(localStorage.getItem("session"))
            let response = await axios.post("/api/auth/verify", { token: tokenBody })
                .then(async res => {
                    setAuthLoading(false)
                    applicationContext.authDispatch({ type: 'AUTHENTICATED' })
                    return res.data
                })
                .catch(err => {
                    router.push('/auth')
                })
            return response
        }
        verifyToken()
    }, [])
    return (
        <>

        {authLoading ? null : <RenderDashboard /> }
        </>
        
    )
}

export default Homepage