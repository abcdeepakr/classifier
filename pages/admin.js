import { useRouter } from 'next/router'
import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from './_app'

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import axios from 'axios'
function Admin() {
    const [isLoading, setLoading] = useState(true)
    const [label, setLabel] = useState("")
    const [labels, setLabels] = useState([])
    const applicationContext = useContext(AppContext)
    const router = useRouter()
    const newLableHandler = (event) =>{
        setLabel(event.target.value)
    }

    const createLabelHandler = () =>{
        let allLabels = localStorage.getItem("labels")
        if(allLabels == null){
            setLabels([label])
            localStorage.setItem("labels",JSON.stringify([label]))
        } else{
            let updated = JSON.parse(allLabels)
            if(updated.indexOf(label)==-1){
                updated.push(label)
            }
            setLabels(updated)
            localStorage.setItem("labels",JSON.stringify(updated))
        }
    }

    const deleteLabelHandler = (event) =>{
        
        let allLabels = JSON.parse(localStorage.getItem("labels"))
        allLabels.splice(allLabels.indexOf(event.target.id), 1)
        setLabels(allLabels)
        localStorage.setItem("labels",JSON.stringify(allLabels))
    }

    useEffect(() => {
        if(localStorage.getItem("labels")!=null){
            setLabels(JSON.parse(localStorage.getItem("labels")))
        }
        const verifyToken = async () => {
            if (localStorage.getItem("session") == null) {
                router.push('/auth')
                return false
            }
            let tokenBody = JSON.parse(localStorage.getItem("session"))
            let response = await axios.post("/api/auth/verify", { token: tokenBody })
                .then(async res => {
                    applicationContext.authDispatch({ type: 'AUTHENTICATED' })
                    if (!res.data.isAdmin) {
                        router.push('/')
                    }
                    setLoading(false)
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

    const styles = {
        container:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexWrap:"wrap",
            flexDirection:"column"
        },
        card: {
            margin:"20px"
            // position:"absolute",
            // display:"flex",
            // top:"20%",
            // left:"50%",
            // transform:"translate(-50%, -50%)"
        },
        labelsCard:{
            margin:"20px"
            // position:"absolute",
            // display:"flex",
            // top:"50%",
            // left:"50%",
            // transform:"translate(-50%, -50%)"
        }
    }
    if (isLoading) {
        return (
            <Box sx={{ width: 400 }
            } >
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box >
        )
    }
 
      
    return (
        <>
        <div style={styles.container}>
        
        <Card style={styles.card} sx={{ width: "auto", minWidth:500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Create a new Label
                </Typography><br></br>
                <TextField onChange={(e)=>{newLableHandler(e)}} 
                    style={{ color: "white" }} 
                    color="success" 
                    id="outlined-basic" 
                    label="Label" 
                    variant="outlined" 
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            ev.preventDefault();
                            ev.target.value =""
                            createLabelHandler()
                        }
                      }}/><br></br><br></br>
                <Button onClick={()=>createLabelHandler()} variant="contained">Create</Button>
            </CardContent><br></br>
            
        </Card>    
        <Card style={styles.labelsCard} sx={{ width: "auto", minWidth:500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Click on a label to delete
                </Typography><br></br>
                {labels.length > 0 ? labels.map(label =>{
                    return <Button onClick={(e)=> deleteLabelHandler(e) } style={{margin:"5px"}} key={label} id={label} color="error" variant="contained">{label}</Button>
                }): null}
            </CardContent><br></br>
            
        </Card>
        </div >
        
        

        </>
    )
}

export default Admin




// ["portrait","cat","sitting","chonky","brown","landscape","sleeping","standing","black","posing","dog","shiba inu","white","lying","golden retriever","smiling","pitbull","running","horse"]