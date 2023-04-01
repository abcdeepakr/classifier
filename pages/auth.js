import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { AppContext } from './_app'
import styles from '../styles/auth.module.css'


import { CardContent, Card, TextField, Typography, Button } from '@mui/material'
export default function Auth() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const applicationContext = useContext(AppContext)

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
                    router.push("/")
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

    async function signInWithEmail() {

        axios.post('/api/auth/signin', { email: email, password: password })
            .then(res => {
                localStorage.setItem("session", JSON.stringify(res.data.auth.session))
                applicationContext.authDispatch({ type: "AUTHENTICATED" })
                router.push("/")
                console.log(res.data)
            })
            .catch(err => console.log(err))

    }

    async function signUp() {
        axios.post('/api/auth/signup', { email: email, password: password })
            .then(res => {
                console.log(res.data)
                router.push("/confirm")
            })
            .catch(err => console.log(err))
    }
    async function updateCreds(event, type) {
        let value = event.target.value
        if (type === 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }


    return (
        <Card className={styles.authCard} style={{background: '#fff'}}>
            <CardContent><br></br>
                <Typography color="#000000" variant="h5" align="center" component="div">
                    Login/Signup
                </Typography><br></br>
                <TextField style={{margin: '10px' }} label="Email" variant="outlined" placeholder='email' type='email' onChange={e => updateCreds(e, 'email')} /><br></br>
                <TextField style={{margin: '10px'}} label="Password" variant="outlined" placeholder='password' type='password' onChange={e => updateCreds(e, 'password')} /><br></br>
                <div  className={styles.buttonContainer}>
                <Button style={{margin: '10px'}} color="success" variant="contained" onClick={() => signInWithEmail()}>Sign In</Button>
                <Button style={{margin: '10px'}} color="success" variant="contained" onClick={() => signUp()}>Sign Up</Button>
                </div>
                
            </CardContent>
        </Card>
    )
}


