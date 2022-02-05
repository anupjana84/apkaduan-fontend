import React, { useState, useEffect, createRef, useRef } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,

    TextField,
    Typography
} from '@mui/material';
import Layout from '../Layout';
// import { errorMessage, successMessage } from '../../../utils';
import { Link } from 'react-router-dom'

import { toast,ToastContainer } from 'react-toastify';



const AddCategory = () => {
  
    const errrorTosta=(error)=>{
        if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        
    }
      const successTosta=(error)=>{
        if(error){
        toast.success(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        
    }



    const formik = useFormik({
        initialValues: {
            title: '',
           
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .max(255)
                .min(3)
                .required(
                    'Title is required'),
           

        }),
        onSubmit: (value, { resetForm }) => {
            console.log(value);
            fetch(`/api/admin/category/add`, {
                method: "POST",
                headers: {

                    'Content-Type': "application/json"
                },

                body: JSON.stringify({ title: value.title })
            }).then((res) => {
                return res.json()
            }).then(data => {
            console.log(data);
            if (data.error) {
                // setValues({
                //     ...initialValues,
                //     error:data.error,
                //    // success:false
                // })
                errrorTosta(data.error)
                resetForm({
                })
                // console.log(data.error)
            } else {
                errrorTosta('Add Successfully')
                resetForm({})


            }

            }).catch(err => console.log(err))
        }
    });
    return (
        <>
        <Layout>
            <Box
                sx={{
                    width: '100%',
                    height: 50,
                    justifyContent: 'space-between',
                    display: 'flex',
                    padding: 0,
                    margin: 0

                }}
            >
                <Link to="/allCategory">
                    <Button sx={{backgroundImage: "linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%)" }} variant="contained">All Category</Button>
                </Link>
                <Button variant="contained" >
                    Home
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
                <Container maxWidth="sm" sx={{ border: 1, borderRadius: 5, borderColor: 'secondary.main' }}>

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Add Category
                            </Typography>

                        </Box>


                        <TextField
                            error={Boolean(formik.touched.title && formik.errors.title)}
                            fullWidth
                            helperText={formik.touched.title && formik.errors.title}
                            label=" Enter Title"
                            margin="normal"
                            name="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.title}
                            variant="outlined"
                        />
                       

                       
                        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                            
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >


                        </Box>

                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Add Category
                            </Button>
                        </Box>

                    </form>
                </Container>
            </Box>
        </Layout >
        <ToastContainer limit={1}/></>
    )
};

export default AddCategory;
