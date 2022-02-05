
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const AddDistrict = () => {
    const [stateAll, setState] = useState([])
    const [lodding, setLodding] = useState(true)
    const [dataLodding, setDataLodding] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            state: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .min(3)
                .required('Title is required'),
            state: Yup
                .string()
                .required('State is required'),



        }),
        onSubmit: (value, { resetForm }) => {

            console.log(value);
            fetch(`/api/admin/createDist`, {
                method: "POST",
                headers: {

                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name: value.name, state: value.state })
            }).then((res) => {
                return res.json()
            }).then(data => {
                // console.log(data)
                if (data.error) {

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
    const getState = () => {
        fetch(`/api/admin/getState`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                //console.log(result);
                if (result.data && result.data.length > 0) {
                    setLodding(false)
                    setState(result.data)

                } else {
                    setTimeout(() => {
                        setLodding(false)
                        setDataLodding(true)
                    }, 1000);
                }

            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getState()
    }, [])
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
                <Link to="/allDistrict">
                    <Button sx={{ backgroundImage: "linear-gradient(to bottom right, red, yellow)" }} variant="contained">
                        All District</Button>
                </Link>
                <Button variant="contained" sx={{ backgroundImage: "linear-gradient(to bottom right, red, yellow)" }} >
                    District
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
                                Add District
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"

                                name="state"

                                label="State"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}

                            >
                                {stateAll && stateAll.map((item, i) => {
                                    return (

                                        <MenuItem key={i} value={item._id}>{item.name}</MenuItem>
                                    )

                                })}

                            </Select>
                            {formik.touched.state && formik.errors.state && <Typography
                                color="textPrimary"
                                variant="h6"
                                sx={{ color: 'red', fontSize: '12px', marginLeft: "10px", marginTop: '7px' }}>{formik.errors.state} </Typography>}
                        </FormControl>
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

export default AddDistrict;
