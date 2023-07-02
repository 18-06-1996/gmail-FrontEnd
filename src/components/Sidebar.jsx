import React from 'react'
import {Drawer, styled} from '@mui/material'
import SideBarContent from './SideBarContent'

 const StyledDrawer = styled(Drawer)({
   marginTop: '54px'
 })
   
 

const Sidebar = ({toggleDrawer,openDrawer}) => {
  return (
   <StyledDrawer
     anchor='left'
     open={openDrawer}
     onClose={toggleDrawer}
     hideBackdrop={true}
     ModelProps={{
        keepMounted:true,
     }}
     varient="persistent"
     sx={{
        '& .MuiDrawer-paper': {
            width: 250,
            borderRight: 'none',
            background: '#f5F5F5',
            marginTop: '64px',
            height: 'calc(100vh - 64px)'
        }
     }}
>
            
          <SideBarContent/>
          
   </StyledDrawer>

  )
}

export default Sidebar
