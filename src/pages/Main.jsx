import React, { Suspense } from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Emails from '../components/Emails'
import { Outlet } from 'react-router-dom'
import SuspenseLoader from '../components/common/SuspenseLoader'
import { Box } from '@mui/material'

const Main = () => {
  const [openDrawer,setOpenDrawer] = useState(true)

  const toggleDrawer = ()=>{
    setOpenDrawer(pre => !pre);

  }
  return (
    <>
     <Header  toggleDrawer={toggleDrawer}/>
     <Box>
       <Sidebar toggleDrawer={toggleDrawer} openDrawer={openDrawer}/>
        <Suspense fallback = {<SuspenseLoader/>}>
          <Outlet context={{openDrawer}}/> 
          
        </Suspense>
    </Box>
   </>
  )
}

export default Main
