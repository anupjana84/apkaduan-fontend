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
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'

import PreviewImage from '../../../components/PreviewImage';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import { useNavigate } from "react-router-dom";

import axios from 'axios';


const SerViceAdd = () => {
    const navigate = useNavigate();
    document.title = "APKA DUKAN | SERVICE"

    const fileRaf = useRef(null)
    const [preview, setPreview] = useState(null)
    const [errorMess, setError] = useState(null)
    const [imageLoad, setImageLoad] = useState(false)


    // const [file, setSelectedFile] = React.useState({
    //     file: undefined,
    //     previewURI: undefined
    // });
    const filedd = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreview(reader.result)
        }
    }

    const chackImage = (file) => {
        //console.log(file)
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
            errorMessage("File Type Only jpeg, png,")
            setPreview(null)

        } else {
            if (file.size > 500000) {
                errorMessage("File size too large, max file size is 0.5 Mb")
                setPreview(null)

            } else {
                setError(null)
                setImageLoad(true)
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    setPreview(reader.result)
                }
            }
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
                .required(
                    'image is required')
                .test("fileSize", "File size too large, max file size is 0.5 Mb", (file) =>
                    file ? file.size <= 500000 : true
                )
                .test("fileType", "Incorrect file type", (file) =>
                    file
                        ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                        : true
                )

        }),
        onSubmit:   async (value, { resetForm, setFieldValue }) => {
            // console.log(value.img);
            //e.preventDefault();
            console.log(value.img)
            const formData = new FormData();
            formData.append('photo', value.img);
            formData.append('name',  value.name);
             console.log(formData)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post("/api/servicesave", formData, config)
                .then((response) => {
                    successMessage('Save successfull')
                       
                    setFieldValue('photo','')
                    setImageLoad(false)
                    resetForm({})
                    setPreview(null)
                    // console.log(response.data.error,'ddddd');
                    // if (response.data.error) {
                    //     errorMessage(response.data.error)
                        
                    // }else{
                       
                        
                    // }
                    // alert(response.data.error);
                  
                }).catch(
                    (err)=> {

                        errorMessage(err.response.data.error)
                    }
                  )

            // console.log(value);
            // fetch(`/api/servicesave`, {
            //     method: "POST",
            //     headers: {

            //         'Content-type': 'multipart/form-data'
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
                    <p>{formik.touched.img && formik.errors.img}</p>
                    <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
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
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.name}
                            variant="outlined"
                        />
                        {/* <input
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
                        /> */}


                        <Box
                            sx={{
                                display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' }, alignItems: "center"
                            }}
                            noValidate
                            autoComplete="off"
                        >


                            <label htmlFor="upload-photo">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="img"
                                    type="file"
                                    onBlur={formik.handleBlur}

                                    onChange={(e) => {
                                        chackImage(e.target.files[0])
                                        formik.setFieldValue('img', e.target.files[0])
                                    }
                                    }
                                />
                                <Fab
                                    color="secondary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                >
                                    <AddIcon /> Upload photo
                                </Fab>
                            </label>

                            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                {preview ? (
                                    <img src={preview} alt='preview' width="75px" height="75px" style={{ borderRadius: '10px', display: 'inline-block' }} />
                                ) : (<AccountCircleTwoToneIcon
                                    style={{ height: 70, width: 70 }}
                                />)}
                            </Box>
                        </Box>


                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={!formik.isValid || !formik.dirty}
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
