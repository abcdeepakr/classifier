import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../pages/_app'
import { useRouter } from 'next/router'
import RenderDashboard from './ImageView/RenderFilterView'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { height } from '@mui/system'

function Homepage() {
    const applicationContext = useContext(AppContext)
    const router = useRouter()
    const [authLoading, setAuthLoading] = useState(true)
    useEffect(() => {
        if(localStorage.getItem("labels")==null || JSON.parse(localStorage.getItem("labels").length == 0 )){
            console.log("Setging image")
            // setLabels(["cat","dog","horse","meow","bark","neigh"])
            localStorage.setItem("labels",JSON.stringify(["cat","dog","horse","meow","bark","neigh"]))
        }
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

    const styles = {
        skeleton: {
            minWidth: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%"
        }
    }
    return (
        <>

            {authLoading ? <div style={styles.skeleton}>
                <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="rounded" width={810} height={500} />
                </Stack>
            </div> : <RenderDashboard />}
        </>

    )
}

export default Homepage