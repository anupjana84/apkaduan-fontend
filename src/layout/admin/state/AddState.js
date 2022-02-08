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
import { errorMessage, successMessage } from '../../../utils';
import { Link } from 'react-router-dom'

import { ToastContainer, toast, } from "react-toastify";




const AddState = () => {
    document.title ="APKA DUKAN | STATE"
    const formik = useFormik({
        initialValues: {
            name: '',
            id: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .min(3)
                .required('Title is required'),
            id: Yup
                .string()
                .max(255)
                .min(3)
                .required('Title is required'),



        }),
        onSubmit: (value, { resetForm }) => {

            console.log(value);
            fetch(`/api/admin/stateSave`, {
                method: "POST",
                headers: {

                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name: value.name, id: value.id })
            }).then((res) => {
                return res.json()
            }).then(data => {
                console.log(data)
                if (data.error) {
                    // setValues({
                    //     ...initialValues,
                    //     error:data.error,
                    //    // success:false
                    // })
                    errorMessage(data.error)
                    resetForm({
                    })
                    // console.log(data.error)
                } else {
                    successMessage('Add Successfully')
                    resetForm({})
                    //console.log(data)

                }

            }).catch(err => console.log(err))
        }
    });
    return (
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
                <Link to="/allState">
                    <Button sx={{ backgroundImage: "linear-gradient(to bottom right, red, yellow)" }} variant="contained">All State</Button>
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
                                Add State
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
                            label=" Enter Title"
                            margin="normal"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.name}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.id && formik.errors.id)}
                            fullWidth
                            helperText={formik.touched.id && formik.errors.id}
                            label=" Enter id"
                            margin="normal"
                            name="id"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.id}
                            variant="outlined"
                        />
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
                                Add State
                            </Button>
                        </Box>

                    </form>
                </Container>
            </Box>

        </Layout >
    )
};

export default AddState;
