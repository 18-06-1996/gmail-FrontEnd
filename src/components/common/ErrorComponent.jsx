import {Box,Typography} from '@mui/material'
import { useRouteError } from 'react-router-dom'
import React from 'react'

const ErrorComponent = () => {
    const error= useRouteError();
    console.log(error);
    
  return (
    <Box style={{marginLeft:250}}>
        <Typography variant='h4'>There eas an error loading this page</Typography>
    </Box>
  )
}

export default ErrorComponent
