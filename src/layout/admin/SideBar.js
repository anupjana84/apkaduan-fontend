





import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SideBar = () => {
  return (
   
      <Grid container spacing={2}>
        <Grid item xs={2} style={{width:'100%'}}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={10}>
          <Item>xs=4</Item>
        </Grid>
       
       
      </Grid>
  
  );
}
export default SideBar;