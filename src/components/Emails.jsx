


import { useOutletContext , useParams} from 'react-router-dom'
import {useEffect,useState}  from 'react'
import { API_URLS } from '../services/api.url';
import UseApi from '../hooks/UseApi';
// import { CheckBox } from '@mui/icons-material';
import { Box,Checkbox,List, ListItem } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email'
import NoMails from './common/NoMails';
import { EMPTY_TABS } from '../constants/constant';

const Emails = () => {
  const {openDrawer} = useOutletContext();
  const {type} = useParams();
  const [selectedEmails, setSelectedEmails] =useState([])
  const [refreshScreen, setRefreshScreen] = useState(false)

  const getEmailsService = UseApi(API_URLS.getEmailFromType)
  const moveEmailsToBinService = UseApi(API_URLS.moveEmailsToBin)
  const deleteEmailsService = UseApi(API_URLS.deleteEmails)
  

  useEffect(() => {
    getEmailsService.call({}, type);
}, [type,refreshScreen])

const selectAllEmails = (e)=>{
  if(e.target.checked){
    const emails =  getEmailsService?.response?.map(email => email._id)
    setSelectedEmails(emails);
   
  }else{
  setSelectedEmails([])
}
}

const deleteSelectedEmails = () =>{
  if(type === 'bin'){
      deleteEmailsService.call(selectedEmails)
  }else{
    moveEmailsToBinService.call(selectedEmails)
  }
  setRefreshScreen(prev => !prev);
}
  return (
    <Box style={openDrawer ? {marginLeft:250,width:'calc(100%-250px)'} : {width:'100%'}}>
      <Box style={{padding: '20px 10px 0 10px', display:'flex',alignItems:'center'} }>
        <Checkbox size='small' onChange={(e)=>selectAllEmails(e)}/>
        <DeleteOutline onClick={(e) => deleteSelectedEmails(e)}/>
      </Box>

      <List>
        {
         getEmailsService?.response?.map(email => (
              <Email
              email={email}
              key={email.id}
             
              selectedEmails={selectedEmails}
              setRefreshScreen={setRefreshScreen}
              setSelectedEmails={setSelectedEmails}
              />
         ))
        }
      </List>
      {
         getEmailsService?.response?.length === 0 &&  <NoMails message={EMPTY_TABS[type]}/>
      }
    </Box>
  )
}

export default Emails
