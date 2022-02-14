import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import DistLayout from './DistLayout'
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
    Autocomplete,
    InputAdornment,
    OutlinedInput,
    IconButton,
    FormControl,
    InputLabel
} from '@mui/material';

import { Link } from 'react-router-dom'
import * as Yup from 'yup';

import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { errorMessage } from '../../utils';
import Select from 'react-select';
const optionss = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const styles = {
    fontSize: 14,
    color: 'blue',
    width: '100%'
}
const options = ['Option 1', 'Option 2'];
const DistAdminDashboard = () => {
    // const formik1 = useFormik()
    const [selectedOption, setSelectedOption] = useState(null);
    // //console.log(formik1)

    // document.querySelectorAll(" p * div ")
    const [stateName, setStateName] = useState([])
    const [value, setValue] = React.useState(null);
    const [value1, setValue1] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const [nameVal, setNameChenge] = React.useState('');
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [getDist, setGetDist] = useState([])


    const getState = () => {
        fetch(`/api/getStateForRegister`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                // console.log(result)
                if (result.data && result.data.length > 0) {
                    const opt = result.data.map(item => {
                        return {
                            label: item.name,
                            value: item._id
                        }
                    })

                    setStateName(opt)

                }

            })
            .catch((err) => console.log(err))
    }
    const getAlldist = (value) => {
        console.log(value.value)

        fetch(`/api/getDistrictByState`, {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },

            body: JSON.stringify({ statid: value.value })
        }).then((res) => {
            return res.json()
        }).then(result => {
            console.log(result);

            if (result.data && result.data.length > 0) {
                const opt = result.data.map(item => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                })

                setGetDist(opt)

            }
            //setGetDist(result.data);
        })
            .catch(err => console.log(err))

    }
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            aadhar: '',
            pan: '',
            pin: '',
            password: '',


        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required')

            // .test(
            //     // Msg
            //     async (email) => {
            //         // Res from backend will be flag at res.data.success, true for 
            //         // username good, false otherwise
            //         const data = await axios.post(
            //             "/api/checkEmail",
            //             { email: email }
            //         )
            //         console.log(data);
            //         if (data.data.success == true) {
            //             resolve(true)
            //         }
            //         reject(true)
            //     }),
            // .test('Unique Email', 'Email already in use',
            //     function (value) {
            //         return new Promise((resolve, reject) => {
            //             axios.post("/api/checkEmail", { 'email': value })
            //                 .then(res => { if (res.data.msg === 'Username already been taken') { resolve(false) } resolve(true) })
            //         })
            //     }
            // ),
            ,
            name: Yup
                .string()
                .max(255)
                .min(3)
                .required(
                    'Name is required'),
            aadhar: Yup
                .string()
                .max(16)
                .min(16)
                .required(
                    'Aadhar is required'),
            pan: Yup
                .string()
                .max(20)
                .required(
                    'Pan No is required'),
            pin: Yup
                .string()
                .max(6)
                .required(
                    'PIN No is required'),
            password: Yup
                .string()
                .max(16)
                .required(
                    'Password No is required'),
            // img: Yup.mixed()
            //     .required(
            //         'image is required')
            //     .test("fileSize", "File size too large, max file size is 0.5 Mb", (file) =>
            //         file ? file.size <= 500000 : true
            //     )
            //     .test("fileType", "Incorrect file type", (file) =>
            //         file
            //             ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
            //             : true
            //     )

        }),
        onSubmit: (value, { resetForm, setFieldValue, isValid, dirty }) => {
            //console.log(value, formik.isValid, formik.dirty);
            // e.preventDefault();
            // const formData = new FormData();
            // formData.append('name', value.name);
            // formData.append('name', value.img);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            // axios.post("/api/servicesave", formData, config)
            //     .then((response) => {
            //         console.log(response.data);
            //         // alert(response.data.error);
            //         resetForm({})
            //     }).catch((err) => {
            //         console.log(err);
            //     });

            // console.log(value);
            fetch(`/api/checkEmail`, {
                method: "POST",
                headers: {

                    'content-type': 'application/json'
                },

                body: JSON.stringify({ email: value.email })
            }).then((res) => {
                return res.json()
            }).then(data => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    // errorMessage(data.error)
                    // resetForm({
                    // })
                    errorMessage(data.error)

                    // setFieldValue('email', 'aaaaa@gmail.com')
                    // //console.log(value.email);
                    // resetForm(!formik.isValid)
                    // resetForm(!formik.dirty)
                    //console.log(value.email);
                    // formik.isValid = false
                    // formik.dirty = false
                } else {
                    //successMessage('Add Successfully')
                    // resetForm({})
                    console.log("data")


                }

            }).catch(err => console.log(err))
        }
    });
    const handleClickShowPassword = () => {
        setPasswordShow(!passwordShow)

    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const changeHandler = value => {
        console.log(value, 'ooo'); // value should be here
    }
    useEffect(() => {
        getState()


    }, [])
    return (
        <DistLayout>
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
                <Link to="/dist/AdminDashboard">
                    <Button sx={{ backgroundImage: "linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%)" }} variant="contained">Dashboard</Button>
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
                <Container maxWidth="md" sx={{ border: 1, borderRadius: 5, borderColor: 'secondary.main' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Add Your Details{value}
                            </Typography>
                        </Box>
                        {/* =================name email======== */}
                        <Box
                            sx={{
                                display: "flex", flexDirection: { xs: 'column', md: 'row' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                size="small"
                                error={Boolean(formik.touched.name && formik.errors.name)}
                                fullWidth
                                helperText={formik.touched.name && formik.errors.name}
                                label=" Enter name "
                                margin="normal"
                                name="name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.name}
                                variant="outlined"

                                sx={{ marginRight: "5px" }}
                            />
                            <TextField
                                size="small"
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                fullWidth
                                helperText={formik.touched.email && formik.errors.email}
                                label=" Enter Email "
                                margin="normal"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.email}
                                variant="outlined"

                            />

                        </Box>
                        {/* =================name email======== */}

                        {/* =================aadhar pan======== */}
                        <Box
                            sx={{
                                display: "flex", flexDirection: { xs: 'column', md: 'row' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                size="small"
                                error={Boolean(formik.touched.aadhar && formik.errors.aadhar)}
                                fullWidth
                                helperText={formik.touched.aadhar && formik.errors.aadhar}
                                label=" Enter aadhar"
                                margin="normal"
                                name="aadhar"
                                onBlur={formik.handleBlur}
                                inputProps={{
                                    maxLength: 16,
                                }}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        formik.setFieldValue('aadhar', e.target.value)
                                    }
                                }}
                                variant="outlined"
                                sx={{ marginRight: "5px" }}
                                value={formik.values.aadhar}
                            />
                            <TextField
                                size="small"
                                error={Boolean(formik.touched.pan && formik.errors.pan)}
                                fullWidth
                                helperText={formik.touched.pan && formik.errors.pan}
                                label=" Enter Pan"
                                margin="normal"
                                name="pan"
                                type="text"
                                variant="outlined"
                                value={formik.values.pan}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </Box>
                        {/* =================aadhar pan======== */}
                        {/* =================Pin password======== */}
                        <Box
                            sx={{
                                display: "flex", flexDirection: { xs: 'column', md: 'row' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                size="small"
                                error={Boolean(formik.touched.pin && formik.errors.pin)}
                                fullWidth
                                helperText={formik.touched.pin && formik.errors.pin}
                                label=" Enter PIN"
                                margin="normal"
                                name="pin"
                                onBlur={formik.handleBlur}
                                inputProps={{
                                    maxLength: 6,
                                }}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        formik.setFieldValue('pin', e.target.value)
                                    }
                                }}
                                variant="outlined"
                                sx={{ marginRight: "5px" }}
                                value={formik.values.pin}
                            />
                            {/* <TextField
                                size="small"
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label=" Enter password"
                                margin="normal"
                                name="pan"
                                type="text"
                                variant="outlined"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            /> */}
                            <FormControl fullWidth sx={{ height: '32px', alignSelf: 'center' }} >
                                <InputLabel htmlFor="standard-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ height: '54px' }}
                                    helperText={formik.touched.password && formik.errors.password}
                                    margin="normal"
                                    size="small"
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={passwordShow ? 'text' : 'password'}
                                    value={formik.values.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                    error={Boolean(formik.touched.password && formik.errors.password)}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {passwordShow ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>
                        </Box>
                        {/* =================Pin password======== */}
                        {/* =============== state dist */}
                        <Box
                            sx={{
                                display: "flex", flexDirection: { xs: 'column', md: 'row' }, justifyContent: "space-between",
                                marginTop: { xs: '10px', md: '' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{
                                width: { xs: '100%', md: '49.5%' }, marginTop: {
                                    xs: "5px", md: ''
                                }
                            }}>
                                <Select
                                    style={styles.select}

                                    onChange={(e) => { getAlldist(e) }}
                                    options={stateName}
                                />

                            </Box>
                            <Box sx={{
                                width: { xs: '100%', md: '49.5%' }, marginTop: {
                                    xs: "5px", md: ''
                                }
                            }}>

                                <Select
                                    style={styles.select}

                                    onChange={(e) => { console.log(e) }}
                                    options={getDist}
                                />


                            </Box>


                            {/* <Autocomplete
                                onChange={(event, newValue) => {
                                    console.log(event, newValue)
                                    //setValue(newValue);
                                }}

                                options={getDist}
                                fullWidth
                                sx={{ marginRight: "5px" }}
                                renderInput={(params) => <TextField fullWidth {...params} label="District Name" />}
                            /> */}

                        </Box>
                        {/* =============== state dist */}

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
                                disabled={!formik.isValid || !formik.dirty}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>

        </DistLayout>
    )
}

export default DistAdminDashboard
