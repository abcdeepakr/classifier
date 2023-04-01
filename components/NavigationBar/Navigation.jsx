import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


import React, { useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AppContext } from '@/pages/_app'
import Link from 'next/link';

function Navigation() {

    const router = useRouter()
    const applicationContext = useContext(AppContext)
    async function signOut() {
        axios.get("/api/auth/signout")
            .then(res => {
                applicationContext.authDispatch({ type: "SIGNOUT" })
                router.push("/auth")
                localStorage.removeItem("session")
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>

            <AppBar position="static">
                <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link style={{color:"unset", textDecoration: "unset", margin: "5px" }} href="/" >
                            Filter Dashboard
                    </Link>
                        </Typography>
                    <Link style={{ textDecoration: "unset", margin: "5px" }} href="/dashboard" >
                        <Button variant="contained" color="info">Dashboard</Button>
                    </Link>
                    <Link style={{ textDecoration: "unset", margin: "5px" }} href="/admin" >
                        <Button variant="contained" color="success">Admin Dashboard</Button>
                    </Link>
                    <Button style={{ textDecoration: "unset", margin: "5px" }} onClick={() => signOut()} variant="contained" color="error">SignOut</Button>

                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navigation