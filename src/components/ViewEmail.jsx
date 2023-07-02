import React from 'react'
import { useOutletContext,useLocation } from 'react-router-dom'
import { Box,Typography,styled } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import { emptyProfilePic } from '../constants/constant';
import UseApi from '../hooks/UseApi';
import { API_URLS } from '../services/api.url';

const IconWrapper = styled(Box)({
  padding:15
})

const Subject = styled(Typography)({
  fontSize:22,
  margin:'10px 0 20px 75px',
  display:'flex'
})
const Indicator =styled(Box)({
    fontSize:'12px !important',
    background:'#ddd',
    color:'#222',
    padding:'2px 4px',
    marginLeft:6,
    borderRadius:4,
    alignSelf:'center'
})

const Container= styled(Box)({
  marginLeft:15,
  width:'100%',
  '&>div':{
    display:'flex',

  '& > p >span' :{
    fontSize:12,
    color:'#5E5E5E'
  }
  }
  
})

const Image =styled('img')({
  borderRadius:'50%',
  width:40,
  height:40,
  margin:'5px 10px 0 10px',
  background:'#cccccc',
})

const Date = styled(Typography)({
  margin:'0 50px 0 auto ',
  fontSize:12,
  color:'#5E5E5E'
})

const ViewEmail = () => {
    const {openDrawer} = useOutletContext();
const {state} = useLocation();
const {email} = state;

const moveEmailsToBinService = UseApi(API_URLS.moveEmailsToBin)

const DeleteEmail =()=>{
  moveEmailsToBinService.call([email._id])
  window.history.back()
}

  return (
    <Box style={openDrawer ? {marginLeft:250,width: '100%'} : {width:'100%'}}>
      <IconWrapper>
          <ArrowBack onClick={ () => window.history.back()} color='action' fontSize='small'/>
          <Delete  color='action' fontSize='small' style={{marginLeft:40}} onClick={()=> DeleteEmail()}/>
      </IconWrapper>
      <Subject>
        {email.subject} <Indicator component='span'>Inbox</Indicator>
      </Subject>
      <Box style={{display:'flex'}}>
      <Image src={emptyProfilePic} alt='db'/>
         <Container >
             <Box>
                <Typography style={{marginTop:10}}>{email.name}
                <Box component="span">&nbsp;&#60;{email.to}&#62; </Box>
                </Typography>
                <Date>
                  {(new window.Date(email.date)).getDate()}&nbsp;
                  {(new window.Date(email.date)).toLocaleString('default',{month: 'long'})}&nbsp;
                  {(new window.Date(email.date)).getFullYear()}
                </Date>
             </Box>
             <Typography style={{marginTop:20}}>
              {email.body}
             </Typography>
         </Container>
      </Box>
    </Box>
  )
}

export default ViewEmail
