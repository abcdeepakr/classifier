import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './_app';
import Homepage from '@/components/Homepage';
import {  useRouter } from 'next/router';
useRouter

const Home = () => {
  const applicationContext = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  return (
    <>
        <Homepage />
    </>
  )
}


export default Home