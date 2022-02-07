import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
const RegisterSeller = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width:'100%' ,
        height: '100%',
        backgroundColor:'red'
      },
    }}
  >
      <Box sx={{ width:100 ,
        height: 100,
        backgroundColor:'red'}}>
            aaaaaaaaaaa
        </Box>
    <Paper elevation={0} />
    <Paper />
    <Paper elevation={3} />
  </Box>
  );
};

export default RegisterSeller;
