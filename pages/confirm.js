import { useRouter } from 'next/router'
import React, {useEffect, useContext} from 'react'
import { AppContext } from './_app'

function Confirm() {
const applicationContext = useContext(AppContext)
const router = useRouter()
  const styles={
    container:{
      display:'flex',
      width:"100vw",
      height:"100vh",
      justifyContent:"center",
      alignItems:"center"
    },
    content:{
      fontSize:"24px",
      textAlign:"center"
    }
  }
  useContext(()=>{
    if(applicationContext.auth.isAuthenticated){
      router.push("/")
    }
  })
  return (
    <div style={styles.container}>
      <p style={styles.content}>

        We have sent a confirmation email to your email.<br></br>
        Thank you for signing in.
      </p>
    </div>
  )
}

export default Confirm