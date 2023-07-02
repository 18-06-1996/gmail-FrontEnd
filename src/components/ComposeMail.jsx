import React from 'react'


import { Dialog,Box,Typography,styled, InputBase , TextField,Button} from '@mui/material'
import { Close, DeleteOutline } from '@mui/icons-material'
import { useState } from 'react'
import UseApi from '../hooks/UseApi'
import { API_URLS } from '../services/api.url'



const dialogStyle ={
    height:"90%",
    width : "80%",
    maxHeight :'100%',
    maxWidth :'100%',
    boxShadow:'none',
    borderRadius:'10px 10px 0 0',
    


}

const Header = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding: '10px 15px',
    background:'#f2f6fc',
    '& > p':{
        fontSize:14,
        fontWeight:500
    }

})

const RecipientWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '& >div':{
        fontSize:'14px',
        borderBottom:'1px solid #F5F5F5 ',
        marginTop:'10px'
    }
})
const Footer = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding: '10px 15px',
    alignItems:'center'
})

const SendButton = styled(Button)({
    background:'#0B57D0',
    color:'#fff',
    fontWeight:'500px',
    textTransform:'none',
    borderRadius:'18px',
    width:'100px'
})

const ComposeMail = ({openDialog, setOpenDialog}) => {
    const [data,setData] = useState({})
    const sentEmailService = UseApi(API_URLS.saveSentEmails)
    const saveDraftService = UseApi(API_URLS.saveDraftEmails)

    const config ={
            Host : "smtp.elasticemail.com",
            Username : process.env.REACT_APP_USERNAME,
            Password : process.env.REACT_APP_PASSWORD,
            Port: 2525,
       
    }

 const closeComposeMail = (e)=>{
    e.preventDefault();
    const payload = {
        to: data.to ,
        from :  "karthick20@yopmail.com",
        subject : data.subject,
        body : data.body,
        date:new Date(),
        image:'',
        name:'kpk',
        starred:false,
        type:'drafts'
    }
    saveDraftService.call(payload)

    if(!saveDraftService.error){
        setOpenDialog(false)
        setData({})
    }else{
        
    }

 }

 const sendMail = (e) =>{
    e.preventDefault();
if(window.Email){
    window.Email.send({
      ...config,
        To : data.to,
        From : "karthick20@yopmail.com",
        Subject : data.subject,
        Body : data.body
    }).then(
      message => alert(message)
    );
}

        const payload = {
            to: data.to ,
            from :  "karthick20@yopmail.com",
            subject : data.subject,
            body : data.body,
            date:new Date(),
            image:'',
            name:'kpk',
            starred:false,
            type:'sent'
        }
        sentEmailService.call(payload)

        if(!sentEmailService.error){
            setOpenDialog(false)
            setData({})
        }else{
            
        }

    setOpenDialog(false)
 }


const onValueChange = (e)=>{
   
    setData({...data,[ e.target.name] : e.target.value});
    console.log(data);
}

  return (
   <Dialog 
   open={openDialog}
   PaperProps={{sx:dialogStyle}}>
   <Header>
<     Typography>New Message</Typography>
         <Close fontSize='small' onClick={(e)=> closeComposeMail(e)}/>
   </Header>

   <RecipientWrapper>
      <InputBase placeholder='Recipients' name='to' onChange={(e)=>onValueChange(e)}/>
      <InputBase placeholder='Subject' name='subject' onChange={(e)=>onValueChange(e)}/>
   </RecipientWrapper>
   
   <TextField 
        multiline
        rows={15}
        sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
        onChange={(e)=>onValueChange(e)}
        name='body'
        value={data.body}
   />

   <Footer>
        <SendButton onClick={(e)=>sendMail(e)}> Send </SendButton>
        <DeleteOutline onClick={()=>setOpenDialog(false)}/>
   </Footer>
   </Dialog>
  )
}

export default ComposeMail
