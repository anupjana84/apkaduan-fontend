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

import PreviewImage from '../../../components/PreviewImage';
import AddIcon from '@mui/icons-material/Add';


import axios from 'axios';


const SerViceAdd = () => {
    const fileRaf = useRef(null)
    const[preview,setPreview]=useState(null)

    // const [file, setSelectedFile] = React.useState({
    //     file: undefined,
    //     previewURI: undefined
    // });
const filedd=(file)=>{
    const reader =new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
        setPreview(reader.result)
    }
}



    const formik = useFormik({
        initialValues: {
            name: '',
            img: null
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .min(3)
                .required(
                    'Title is required'),
            img: Yup.mixed()
                .test("fileSize", "File size too large, max file size is 1 Mb", (file) =>
                    file ? file.size <= 1000000 : true
                )
                .test("fileType", "Incorrect file type", (file) =>
                    file
                        ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                        : true
                )

        }),
        onSubmit: (value, { resetForm }) => {
            console.log(value.img);
            //e.preventDefault();
            const formData = new FormData();
            formData.append('photo', value.img);
            formData.append('name', value.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post("/api/servicesave", formData, config)
                .then((response) => {
                    console.log(response.data);
                    // alert(response.data.error);
                    resetForm({})
                }).catch((err) => {
                    console.log(err);
                });

            // console.log(value);
            // fetch(`/servicesave`, {
            //     method: "POST",
            //     headers: {

            //         'content-type': 'multipart/form-data'
            //     },

            //     body: formData
            // }).then((res) => {
            //     return res.json()
            // }).then(data => {
            //     console.log(data)
            //     if (data.error) {
            //         // setValues({
            //         //     ...initialValues,
            //         //     error:data.error,
            //         //    // success:false
            //         // })
            //        // errorMessage(data.error)
            //         resetForm({
            //         })
            //         // console.log(data.error)
            //     } else {
            //         //successMessage('Add Successfully')
            //         resetForm({})
            //         console.log(data)


            //     }

            //  }).catch(err => console.log(err))
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
                <Link to="/allService">
                    <Button color="success" variant="contained">All Service</Button>
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
                                Add Service
                            </Typography>

                        </Box>


                        <TextField
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
                            label=" Enter Title"
                            margin="normal"
                            name="name"
                            //onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.name}
                            variant="outlined"
                        />
                        <input
                            name="img"
                            //onBlur={formik.handleBlur}
                            hidden
                            onChange={(event) => {
                                event.preventDefault()
                                filedd(event.target.files[0])
                                formik.setFieldValue("img", event.target.files[0]);

                            }}
                            ref={fileRaf}
                            type="file"
                            style={{ paddingTop: 10 }}
                            accept=".png,.jpg,.jpeg"
                        />

                        {formik.errors.img && formik.touched.img ? (
                            <Typography
                                color="textPrimary"
                                variant="h6"
                            >
                                {JSON.stringify(formik.errors.img)}
                            </Typography>



                        ) : (formik.values.img &&
                            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                <img src={preview} alt='preview' width="75px" height="75px" style={{borderRadius:'10px',display:'inline-block'}}/>
                            </Box>

                        )}

                        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                            <Button

                                onClick={() => fileRaf.current.click()}
                                startIcon={<AddIcon />}
                                size="large"
                                type="submit"
                                sx={{ backgroundColor: '#9b06d1', color: "white", mt: 1 }}
                                variant="contained"


                            >
                                UPLOAD PHOTO
                            </Button>
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
                                Add Service
                            </Button>
                        </Box>

                    </form>
                </Container>
            </Box>
        </Layout >
    )
};

export default SerViceAdd;
