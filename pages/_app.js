import '@/styles/globals.css'
import { useReducer, createContext } from 'react';
import Navigation from '@/components/NavigationBar/Navigation';
import {reducer, authState, filterState} from '../context/AppReducer'
import { useRouter } from 'next/router';

export const AppContext = createContext(); // AppContext is the name of the new context
export default function App({ Component, pageProps }) {
  const [auth, authDispatch] = useReducer(reducer, authState);
  const [filters, filterDispatch] = useReducer(reducer, filterState);
  const router = useRouter()
  return (
    <AppContext.Provider value={{ auth: auth, authDispatch: authDispatch , filters: filters, filterDispatch: filterDispatch}} >
      {router.pathname == "/auth" || router.pathname == "/confirm" ? null : <Navigation />}
      <Component {...pageProps} />
      
      
    </AppContext.Provider>
  )
}
