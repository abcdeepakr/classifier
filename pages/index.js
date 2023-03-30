import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Home() {

  useEffect(()=>{
    axios.get('/api/hello')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  },[])
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@originhealth.com',
      password: 'adminpassword',
    })
    if(error){
      console.log(error)
    } else{
      console.log(data)
    }
  }

  async function signUp(){
    const {data, error} = await supabase.auth.signUp({
      email: 'awsmyo1234@gmail.com',
      password: 'example-password',
    });
    if(error){
      console.log(error)
    } else{
      console.log(data)
    }
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(error){
      console.log(error)
    } else{
      console.log(data)
    }
  }
  return (
    <>
      <button onClick={()=> signUp()}>Sign UP</button><br></br><br></br>
      <button onClick={()=> signInWithEmail()}>signInWithEmail</button><br></br>
      <button onClick={()=> signOut()}>sign out</button><br></br>
    </>
  )
}


