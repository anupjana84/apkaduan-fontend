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
import { API } from '../../../utils/api';
import PreviewImage from '../../../components/PreviewImage';
import AddIcon from '@mui/icons-material/Add';




const AddCategory = () => {
    const fileRaf = useRef(null)

    // const [file, setSelectedFile] = React.useState({
    //     file: undefined,
    //     previewURI: undefined
    // });




    const formik = useFormik({
        initialValues: {
            title: '',
            img: null
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .max(255)
                .min(3)
                .required(
                    'Title is required'),
            img: Yup.mixed()
                .test("fileSize", "File size too large, max file size is 1 Mb", (file) =>
                    file ? file.size <= 1100000 : true
                )
                .test("fileType", "Incorrect file type", (file) =>
                    file
                        ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                        : true
                )

        }),
        onSubmit: (value, { resetForm }) => {
            console.log(value);
            // fetch(`/admin/category/add`, {
            //     method: "POST",
            //     headers: {

            //         'Content-Type': "application/json"
            //     },

            //     body: JSON.stringify({ title: value.title })
            // }).then((res) => {
            //     return res.json()
            // }).then(data => {
            //console.log(data);
            // if (data.error) {
            //     // setValues({
            //     //     ...initialValues,
            //     //     error:data.error,
            //     //    // success:false
            //     // })
            //     errorMessage(data.error)
            //     resetForm({
            //     })
            //     // console.log(data.error)
            // } else {
            //     successMessage('Add Successfully')
            //     resetForm({})


            // }

            // }).catch(err => console.log(err))
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
                <Link to="/allCategory">
                    <Button color="success" variant="contained">All Category</Button>
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
                        <input
                            name="img"
                            onBlur={formik.handleBlur}
                            hidden
                            onChange={(event) => {
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
                                <PreviewImage file={formik.values.img} />
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
                                Add Category
                            </Button>
                        </Box>

                    </form>
                </Container>
            </Box>
        </Layout >
    )
};

export default AddCategory;
