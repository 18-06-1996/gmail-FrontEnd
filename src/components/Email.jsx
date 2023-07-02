import React from 'react'
import { Box,Checkbox ,Typography,styled} from '@mui/material';
import { Star,StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {routes } from '../routes/routes'
import ViewEmail from './ViewEmail';
import UseApi from '../hooks/UseApi';
import { API_URLS } from '../services/api.url';

const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background:'#f2f6fc',
    display:'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& >div':{
        display: 'flex',
        width:'100%',
        '& >p':{
            fontSize:14
        }
    }
})

const Indicator = styled(Typography)({
    fontSize:'12px !important' ,background:'#ddd',
    color:'#222',
    padding:'0 4px',
    borderRadius:'4px',
    marginRight:'6px'

})
const Date= styled(Typography)({
    marginLeft:'auto',
    marginRight:'20px',
    fontSize:12,
    color:'#5F6368'
})

const Email = ({email,selectedEmails,setRefreshScreen,setSelectedEmails}) => {
    const navigate = useNavigate()

const toggleStarredService = UseApi(API_URLS.toggleStarredEmails)

const toggleStarredMails = () =>{
     toggleStarredService.call({id:email._id,value:!email.starred})
     setRefreshScreen(prev => !prev)
}
const onValueChange = ()=>{
    if(selectedEmails.includes(email._id)){
        setSelectedEmails(prev => prev.filter(id => id !== email._id))
    }else{
        setSelectedEmails(prevState => [...prevState,email._id])
    }
}

  return (
    <Wrapper>
            <Checkbox size='small'
            checked={selectedEmails.includes(email._id)}
            onChange={()=>onValueChange()}
            />

            {
                email.starred ? <Star  fontSize= 'small' style={{marginRight:10,color:'#FFF200'}} onClick={()=>toggleStarredMails()} />
             : <StarBorder fontSize= 'small' style={{marginRight:10}} onClick={()=>toggleStarredMails()}/>
            }

            

            <Box onClick={()=>navigate(routes.view.path,{state:{email:email}})}>
               
            <Typography style={{width:200}}>To:{email.name}</Typography>
            <Indicator>Inbox</Indicator>
            <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
            <Date>
                {(new window.Date(email.date)).getDate()}&nbsp;
                {(new window.Date(email.date)).toLocaleString('default',{month: 'long'})}
            </Date>
            </Box>
    </Wrapper>
  )
}

export default Email
