import React from 'react'
import {Box,Button,styled,List,ListItem} from '@mui/material'
import { CreateOutlined } from '@mui/icons-material'
import SIDEBAR_DATA from '../config/sidebar.config'
import ComposeMail from './ComposeMail'
import { useState } from 'react'
import {NavLink, useParams} from 'react-router-dom'
import routes from '../routes/routes.js'


const Container = styled(Box)({
    padding:8,
    '& > ul':{
        padding:'10px 0 0 5px',
        fontSize:14,
        fontWeight:500,
        cursor:'pointer',
        '& > a':{
            textDecoration:'none',
            color: 'inherit'
        }
    },
    '& >  a > li > svg' : {
        marginRight:20,
    } 
})

const ComposeButton = styled(Button)({
   background:'#c2e7ff',
   color:'#001d35',
   padding:'15px',
   borderRadius:'16px',
   minWidth:'140px',
   textTransform:'none'
})




const SideBarContent = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const {type} = useParams();

    const onComposeClick = ()=>{
        setOpenDialog(true)
    }

    
  return (
    <Container>
       <ComposeButton onClick={() =>onComposeClick()}>
            <CreateOutlined  style={{ marginRight: 10 }}/> Compose
       </ComposeButton> 
        <List>
            {
                SIDEBAR_DATA.map(data=>(
                    <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                    <ListItem style={type ===  data.name.toLowerCase() ? {
                        backgroundColor: '#d3e3fd' , borderRadius: '0 16px 16px 0'
                    } : {}}>
                       <data.icon fontSize='small' />{data.title}
                    </ListItem>
                    </NavLink>
                ))
            }
        </List>
        <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    </Container>
  )
}

export default SideBarContent
