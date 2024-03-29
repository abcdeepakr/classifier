import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AppContext } from './_app'
import DashboardCard from '@/components/Dashboard/DashboardCard'
import imagesJson from '../public/content/schema.json'
function Dashboard() {
    const [loading, setLoading] = useState(true)
    const applicationContext = useContext(AppContext)
    
    const router = useRouter()
    useEffect(() => {

        let animalData = localStorage.getItem('animalData')
        if(animalData == null){
            animalData = imagesJson.images
        } else{
            animalData = [...JSON.parse(localStorage.getItem('animalData'))]
        }
        localStorage.setItem("animalData", JSON.stringify(animalData))
        const verifyToken = async () => {
            if (localStorage.getItem("session") == null) {
                router.push('/auth')
                return false
            }
            let tokenBody = JSON.parse(localStorage.getItem("session"))
            let response = await axios.post("/api/auth/verify", { token: tokenBody })
                .then(async res => {
                    applicationContext.authDispatch({ type: 'AUTHENTICATED' })
                    setLoading(false)
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
            {imagesJson.images.map(imageObject => {
                return <DashboardCard imageData={imageObject} key={imageObject.id} />
            })}

        </>
    )
}

export default Dashboard