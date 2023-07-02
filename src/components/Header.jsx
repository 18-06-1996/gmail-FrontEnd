import React from 'react'

import {AppBar,Toolbar,styled,InputBase,Box} from '@mui/material'
import {Menu as MenuIcon,Search,Tune,HelpOutlineOutlined,SettingsOutlined,AppsOutlined,AccountCircleOutlined} from'@mui/icons-material'
import { gmail_logo } from '../constants/constant'


const StyledAppBar = styled(AppBar)({
    background : '#f5F5F5',
    boxShadow : 'none'
})

const SearchWraper = styled(Box)({
    background : '#EAF1FB',
    marginLeft: '80px',
    borderRadius: '8px',
    minWidth: '690px',
    maxWidth: '720px',
    height:'48px',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div':{
        width:'100%',
        
       
    }
})

const OptionsWrapper = styled(Box)({
  width:'100%',
  display: 'flex',
  justifyContent:'end',
  '& > svg':{
      marginLeft:'20px'
  }

})

const Header = ({toggleDrawer}) => {
  return (
    <StyledAppBar position='static'>
        <Toolbar>
            <MenuIcon color="action" onClick={toggleDrawer}/>
            <img src={gmail_logo} alt='logo' style={{width:110,marginLeft:15}}/>
            <SearchWraper>
                <Search color='action'/>
                <InputBase /> 
                <Tune color='action'/>
            </SearchWraper>

            <OptionsWrapper>
                <HelpOutlineOutlined color='action'/>
                <SettingsOutlined color='action' />
                <AppsOutlined color='action'/>
                <AccountCircleOutlined color='action'/>

            </OptionsWrapper>
        </Toolbar>
    </StyledAppBar>
  )
}

export default Header
