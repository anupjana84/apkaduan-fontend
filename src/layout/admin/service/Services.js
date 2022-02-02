import React,{useState} from 'react';
import Box from '@mui/material/Box';

import {TextField,Typography, Container,Button,Stack} from '@mui/material';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
const Services = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
//   const snakBar=()=>{
//       return(
//         <Snackbar
//         open={open}
//         autoHideDuration={2000}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center'} }  
//       >
//           <Alert severity="warning" sx={{ width: '100%' }}>A</Alert>
//         </Snackbar>
//       )
//   }
   
const successMessage=(message)=>{
    if(message){
        toast.success(`${message}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        

}
 const errorMessage=(error)=>{
    if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        

}
      
const handelSubmit=(e)=>{
    e.preventDefault();
    // if (name=='', image=="") {
    //     successMessage('All Field Required')
    // }
    // let formData = new FormData();
    // console.log(image);
    // let localUri = image.uri;
    //   let filename = image.fileName;
    //   let type = image.type;
    //   formData.append('photo', image);
    //   fetch("/servicesave", {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //           Accept:"application/json",
    //             'Content-type': 'multipart/form-data',
              
    //         },
    //     }).then(res => {
    //         return res.json()
    //     }).then(result=>{
    //       console.log(result);
    //     }).catch(err=>{
    //       console.log(err);
    //     })
   e.preventDefault();
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('name', name);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("/servicesave",formData,config)
        .then((response) => {
          console.log(response.data);
           // alert(response.data.error);
        }).catch((err) => {
          console.log(err);
    });
}

  return(
      <>
      <Layout>
      <Box
      sx={{
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        display: 'flex',
       padding:0,
       margin:0
       
      }}
    >
     <Link to="/allService">
      <Button  color="success" variant="contained">All Service</Button>
      </Link>
      <Button variant="contained" >
        Link
      </Button>
    
       </Box>
          <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
       
        <Container maxWidth="sm" sx={{ border: 1,borderRadius:5, borderColor: 'secondary.main',padding:5 }}>
        

        <Typography
                color="textPrimary"
                variant="h4"
              >
                Create Services
              </Typography>
            <TextField 
             value={name}
             onChange={(e) => setName(e.target.value)}
             id="outlined-basic" fullWidth style={{marginTop:10,marginBottom:10}} label="Service Name" variant="outlined" />
            <div className="input-group mb-3">
                
                <input type="file"
                onChange={(e) => {
                    setImage(e.target.files[0])
                  }}
                className="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload"/>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="validationServer01">First name</label>
                  <input type="text" className="form-control is-valid" id="validationServer01" value="Mark" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="validationServer02">Last name</label>
                  <input type="text" className="form-control is-valid" id="validationServer02" value="Otto" required/>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
            </div>
            <Button
                color="primary"
                style={{marginTop:10}}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handelSubmit}
              >
               Service Save
              </Button>
            </Container>
        </Box>
    </Layout>
    <ToastContainer />
    </>
  )
};

export default Services;
