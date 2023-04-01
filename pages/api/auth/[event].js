import { createClient } from '@supabase/supabase-js'
import verifyToken from '@/utils/api_helpers/authHelpers'
import { findUser, createUser } from '@/utils/api_helpers/database'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default async function auth(req, res) {
    const { event } = req.query
    switch (event){
      case "signup" :{
        const {data, error} = await supabase.auth.signUp({
          email: req.body.email,
          password: req.body.password,
        });
        if(error){
          return res.status(404).json({ error: error })
        } else{
          const userCreated = await createUser(supabase, data)
          return res.status(200).json({ auth: data })
        }
      }
      case 'signin':{
        const { data, error } = await supabase.auth.signInWithPassword({
          email: req.body.email,
          password: req.body.password,
        })
        if(error){
          return res.status(404).json({ error: error })
        } else{
          const user = findUser(supabase,data.user.id)
        let isAdmin = await user.then(res => {
          if(res.status !=200){
            return false
          } else{
            if(res.user.role == 'admin'){
              return true
            } else{
              return false
            }
          }
        })
          return res.status(200).json({ auth: data, isAdmin:isAdmin })
        }
      }
      case 'signout':{
        const { error } = await supabase.auth.signOut()
        if (error) {
          return res.status(402).json({ error: error })
        } else {
          return res.status(200).json({ signout: true })
        }
      }
      case 'verify':{
        const isExpired = verifyToken(req.body)
        const user = findUser(supabase, req.body.token.user.id)
        let isAdmin = await user.then(res => {
          if(res.status !=200){
            return false
          } else{
            if(res.user.role == 'admin'){
              return true
            } else{
              return false
            }
          }
        })
        if(isExpired){
          return res.status(401).json({error:"Token Expired", client_message:"Session Expired, please sign in again"})
        } else{
          return res.status(200).json({message:"Valid Session", isAdmin:isAdmin})
        }
      }
      default:
        return res.status(404).json({ error: 'not found' })
    }
    
  }