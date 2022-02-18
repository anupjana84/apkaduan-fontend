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
    InputLabel,
    Fab
} from '@mui/material';

import { Link } from 'react-router-dom'
import * as Yup from 'yup';

import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { errorMessage,successMessage } from '../../utils';
import Select from 'react-select';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import AddIcon from '@mui/icons-material/Add';
import { isAutheticated } from '../../helper';

const styles = {
    fontSize: 14,
    color: 'blue',
    width: '100%'
}
const options = ['Option 1', 'Option 2'];
const DistAdminDashboard = () => {
    
    // document.querySelectorAll(" p * div ")
   const[stateName, setStateName]=useState(null)

   const[distName, setDistName]=useState('')
    const [stateNameAll, setStateNameAll] = useState([])
   const [getDistall, setGetDistAll] = useState([])
    const [passwordShow, setPasswordShow] = React.useState(false);
    
    const [previewAadhar, setPreviewAadhar] = useState(null)
    const [previewAadharLoad, setPreviewAadharLoad] = useState(false)
    const [previewPan, setPreviewPan] = useState(null)
    const [previewPanLoad, setPreviewPanLoad] = useState(false)
    const [previewProfile, setPreviewProfile] = useState(null)
    const [previewProfileLoad, setPreviewPrifileLoad] = useState(false)
    const [errorMess, setError] = useState(null)
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [value1, setValue1] = React.useState(null);
    const [inputValue1, setInputValue1] = React.useState('');
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
                    setValue(opt[0])
                    setStateNameAll(opt)

                }

            })
            .catch((err) => console.log(err))
    }
    const getAlldist = (value) => {
        // setStateName(value.value)
        // setDistName('')
        fetch(`/api/getDistrictByState`, {
            method: "POST",
            headers: {

                'content-type': 'application/json'
            },

            body: JSON.stringify({ statid: value.value })
        }).then((res) => {
            return res.json()
        }).then(result => {
            console.log(result,'result');

            if (result.data && result.data.length > 0) {
                const opt = result.data.map(item => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                })

                setGetDistAll(opt)

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
            state: '',
            dist:'',
            aadharcard:null,
            pancard:null,
            profile:null,


        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            state: Yup
                .string()
                .required(
                    'State is required'),
            dist: Yup
                .string()
                .required(
                    'State is required'),
            aadharcard: Yup.mixed()
                .required(
                    'image is required')
                .test("fileSize", "File size too large, max file size is 0.5 Mb", (file) =>
                    file ? file.size <= 500000 : true
                )
                .test("fileType", "Incorrect file type", (file) =>
                    file
                        ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                        : true
                ),
            pancard: Yup.mixed()
                .required(
                    'image is required')
                .test("fileSize", "File size too large, max file size is 0.5 Mb", (file) =>
                    file ? file.size <= 500000 : true
                )
                .test("fileType", "Incorrect file type", (file) =>
                    file
                        ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                        : true
                ),
            profile: Yup.mixed()
                .required(
                    'image is required')
                .test("fileSize", "File size too large, max file size is 0.5 Mb", (file) =>
                    file ? file.size <= 500000 : true
                )
                .test("fileType", "Incorrect file type", (file) =>
                    file
                        ? ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
                        : true
                ),
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
                    'Aadhar are required and 16 Digit required'),
            pan: Yup
                .string()
                .max(20)
                .required(
                    'Pan No is  required'),
            pin: Yup
                .string()
                .max(6)
                .required(
                    'PIN No are required and 6 Digit '),
            password: Yup
                .string()
                .min(6)
                .max(16)
                .required(
                    'Password No is required'),
           

        }),
        onSubmit: (value, { resetForm, setFieldValue, isValid, dirty }) => {
           
             const {user,token}=isAutheticated()
          
            const {name,email,aadhar,pan,pin,password,state,dist,aadharcard,pancard,profile}=value
          
             const formData = new FormData();
            formData.append('name', value.name);
            formData.append('email', value.email);
            formData.append('aadhar', value.aadhar);
            formData.append('pan', value.pan);
            formData.append('pin', value.pin);
            formData.append('password', value.password);
            formData.append('state', value.state);
            formData.append('dist', value.dist);
            formData.append('aadharcard', value.aadharcard);
            formData.append('pancard', value.pancard);
            formData.append('profile', value.profile);
            formData.append('_id',user._id);
           
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization:`Bearer ${token}`
                }
            };
            axios.post("/api/dist/distAdminProfileInsert", formData, config)
                .then((response) => {
                   
                     console.log(response.message);
                    successMessage('Add Successfully')
                    // alert(response.data.error);
                    resetForm({})
                }).catch((err) => {
                    errorMessage(err.response.data.error)
                });

          
        }
    });
    const handleClickShowPassword = () => {
        setPasswordShow(!passwordShow)

    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        getState()

    }, [])
    //check Aadhar Card
    const chackAadhar = (file) => {
        console.log(file)
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
            errorMessage("File Type Only jpeg, png,")
            setPreviewAadhar(null)

        } else {
            if (file.size > 500000) {
                errorMessage("File size too large, max file size is 0.5 Mb")
                setPreviewAadhar(null)
            } else {
                setError(null)
                setPreviewAadharLoad(true)

                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    setPreviewAadhar(reader.result)
                }
            }
        }
    }
    //check Pan Card
    const chackPan = (file) => {
        console.log(file)
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
            errorMessage("File Type Only jpeg, png,")
            setPreviewPan(null)

        } else {
            if (file.size > 500000) {
                errorMessage("File size too large, max file size is 0.5 Mb")
                setPreviewPan(null)
            } else {
                setError(null)
                setPreviewPanLoad(true)

                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    setPreviewPan(reader.result)
                }
            }
        }
    }
     //check Profile Image
    const chackProfile = (file) => {
        // console.log(file)
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
            errorMessage("File Type Only jpeg, png,")
            setPreviewProfile(null)

        } else {
            if (file.size > 500000) {
                errorMessage("File size too large, max file size is 0.5 Mb")
                setPreviewProfile(null)
            } else {
                setError(null)
                setPreviewPrifileLoad(true)

                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    setPreviewProfile(reader.result)
                    
                }
            }
        }
    }

    const save=()=>{
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjAyNzg5Yjc2ZjZlZTJmZjQ4ZWIzNDYiLCJyb2xlIjoiZGlzdGFkbWluIiwiaWF0IjoxNjQ1MDEzOTkyLCJleHAiOjE2NDUwMTM5OTN9.2Je2vBR9Y8-hfITSC0kr8lJt1AM3TWzLjkJfNkqE7IU"
        fetch(`/api/otpReceiveDistAdmin`, {
            method: "POST",
            headers: {

                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            },

            body: JSON.stringify({ email: "value.email" })
        }).then((res) => {
            return res.json()
        }).then(data => {
            console.log(data,'data');
        }
        )
        .catch((err)=>{
            console.log(err,'err');
        })

    }
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
                <Button
                size='small'
                sx={{ backgroundImage: "linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%)" }} variant="contained" >
                    Partner
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
                                Add Your Details
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
                                label=" Postal Code"
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
                            autoComplete="off" >
                            {/* <Box sx={{
                                width: { xs: '100%', md: '49.5%' }, marginTop: {
                                    xs: "5px", md: ''
                                }
                            }}>
                                <Select
                                    value={formik.values.state}
                                    style={styles.select}
                                    placeholder={"Select Your State"}
                                    onChange={(e) => { getAlldist(e)
                                    formik.setFieldValue('state', e.value)
                                    }}
                                    options={stateNameAll}
                                />
                                {formik.touched.state && formik.errors.state? <span>{formik.touched.state && formik.errors.state}</span>:null}
                            </Box>
                            <Box sx={{
                                width: { xs: '100%', md: '49.5%' }, marginTop: {
                                    xs: "5px", md: ''
                                }
                            }}>
                                <Select
                                    value={formik.values.dist}
                                    placeholder={"Select Your District"}
                                    style={styles.select}
                                    onChange={(e) => { setDistName(e.value)
                                        formik.setFieldValue('dist', e.value)
                                    }}
                                    options={getDistall}
                                />
                                {formik.touched.dist && formik.errors.dist? <span>{formik.touched.dist && formik.errors.dist}</span>:null}
                            </Box> */}
                             <Autocomplete
                                size='small'
                                
                                onChange={(event, newValue) => {
                                    getAlldist(newValue)
                                    formik.setFieldValue('state',newValue.value)
                                    formik.setFieldValue('dist','')
                                    setValue1('');
                                setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={stateNameAll}
                               fullWidth
                               sx={{ marginRight: "5px" }}
                                renderInput={(params) => <TextField {...params} label="Select State Name" />}
                        />
                             <Autocomplete
                                size='small'
                                value={value1}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('dist',newValue.value)
                                setValue1(newValue);
                                }}
                                inputValue={inputValue1}
                                onInputChange={(event, newInputValue) => {
                                setInputValue1(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={getDistall}
                               fullWidth
                                renderInput={(params) => <TextField {...params} label="Select District Name " />}
                        />
                        </Box>
                        {/* =============== state dist */}
                        {/* =============== Aadhar */}
                        <Box
                            sx={{
                                display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' }, alignItems: "center",
                                marginTop:{xs: '5px', md: '8px'}
                            }}
                            noValidate
                            autoComplete="off" >
                       


                            <label htmlFor="aadhar">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="aadhar"
                                    name="aadharcard"
                                    type="file"
                                    onBlur={formik.handleBlur}

                                    onChange={(e) => {
                                        chackAadhar(e.target.files[0])
                                        formik.setFieldValue('aadharcard', e.target.files[0])
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
                                    <AddIcon /> Upload Aadhar
                                </Fab>
                            </label>

                            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center',
                        marginTop:{xs: '5px', md: '0px' } }}>
                                {previewAadharLoad ? (
                                    <img src={previewAadhar} alt='preview' width="75px" height="75px" style={{ borderRadius: '10px', display: 'inline-block' }} />
                                ) : (<AccountCircleTwoToneIcon
                                    style={{ height: 70, width: 70 }}
                                />)}
                            </Box>
                        </Box>
                        {/* =============== Aadhar */}
                        {/* =============== Pan */}
                        <Box
                            sx={{
                                display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' }, alignItems: "center",
                                marginTop:{xs: '0px', md: '8px'}
                            }}
                            noValidate
                            autoComplete="off" >
                            <label htmlFor="pan">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="pan"
                                    name="pan"
                                    type="file"
                                    onBlur={formik.handleBlur}

                                    onChange={(e) => {
                                        chackPan(e.target.files[0])
                                        formik.setFieldValue('pancard', e.target.files[0])
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
                                    <AddIcon /> Upload Pan
                                </Fab>
                            </label>

                            <Box sx={{marginTop:{xs: '5px', md: '0px' }, display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                {previewPanLoad ? (
                                    <img src={previewPan} alt='preview' width="75px" height="75px" style={{ borderRadius: '10px', display: 'inline-block' }} />
                                ) : (<AccountCircleTwoToneIcon
                                    style={{ height: 70, width: 70 }}
                                />)}
                            </Box>
                        </Box>
                        {/* =============== Pan */}
                        {/* =============== Profile */}
                        <Box
                            sx={{
                                display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' }, alignItems: "center",
                                marginTop:{xs: '5px', md: '8px'}
                            }}
                            noValidate
                            autoComplete="off" >
                            <label htmlFor="profile">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profile"
                                    name="profile"
                                    type="file"
                                    onBlur={formik.handleBlur}

                                    onChange={(e) => {
                                        chackProfile(e.target.files[0])
                                        formik.setFieldValue('profile', e.target.files[0])
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
                                    <AddIcon /> Profile Image
                                </Fab>
                            </label>

                            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center',
                            marginTop:{xs: '5px', md: '0px' }}}>
                                {previewProfileLoad ? (
                                    <img src={previewProfile} alt='preview' width="75px" height="75px" style={{ borderRadius: '10px', display: 'inline-block' }} />
                                ) : (<AccountCircleTwoToneIcon
                                    style={{ height: 70, width: 70 }}
                                />)}
                            </Box>
                        </Box>
                        {/* =============== Profile */}

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
