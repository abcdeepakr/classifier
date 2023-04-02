
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { AppContext } from './_app'
import styles from '../styles/auth.module.css'

import { CardContent, Card, TextField, Typography, Button, CircularProgress } from '@mui/material'
export default function Auth() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSignInError, setSignInError] = useState({ state: false, message: "" })
    const applicationContext = useContext(AppContext)

    useEffect(() => {
        const verifyToken = async () => {
            if (localStorage.getItem("session") == null) {
                router.push('/auth')
                return false
            }
            let tokenBody = JSON.parse(localStorage.getItem("session"))
            let response = await axios.post("/api/auth/verify", { token: tokenBody })
                .then(async res => {
                    router.push("/")
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

    async function signInWithEmail() {
        setLoading(true)
        let errorObj = { status: false, message: "" }
        setSignInError(errorObj)
        axios.post('/api/auth/signin', { email: email, password: password })
            .then(res => {
                localStorage.setItem("session", JSON.stringify(res.data.auth.session))
                applicationContext.authDispatch({ type: "AUTHENTICATED" })
                router.push("/")
                setLoading(false)
            })
            .catch(err => {
                let errorObj = { status: true, message: err.response.data.error.message }
                setSignInError(errorObj)
                setLoading(false)
            })

    }

    async function signUp() {
        setLoading(true)
        axios.post('/api/auth/signup', { email: email, password: password })
            .then(res => {
                setLoading(false)
                router.push("/confirm")

            })
            .catch(err => {
                setLoading(false)
            })
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
        <>
        <p className={styles.heading}>Image Classifier</p>
        <div className={styles.cardContainer}>
        <Card className={styles.authCard} style={{ background: '#fff' }}>
                <CardContent><br></br>
                    <Typography color="#000000" variant="h5" align="center" component="div">
                        Login/Signup
                    </Typography><br></br>

                    {isSignInError.status ? <p className={styles.error}>{isSignInError.message}</p> : null}
                    <TextField style={{ margin: '10px' }} label="Email" variant="outlined" placeholder='email' type='email' onChange={e => updateCreds(e, 'email')} /><br></br>
                    <TextField style={{ margin: '10px' }} label="Password" variant="outlined" placeholder='password' type='password' onChange={e => updateCreds(e, 'password')} /><br></br>
                    <div className={styles.buttonContainer}>

                        <Button style={{ margin: '10px' }} color="success" variant="contained" onClick={() => signInWithEmail()}>
                            {loading ? <CircularProgress size="1.8rem" color="inherit" /> : "Sign In"}
                        </Button>
                        <Button style={{ margin: '10px' }} color="success" variant="contained" onClick={() => signUp()}>Sign Up</Button>
                    </div>

                </CardContent>
            </Card>
        </div>
            
        <p className={styles.creds}>Test Credentials <br></br>Username: <b>admin@classifier.com</b> <br></br>Password: <b>adminpassword</b></p>  
        </>
    )
}


