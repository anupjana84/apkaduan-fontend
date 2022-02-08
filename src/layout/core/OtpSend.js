import React,{useState} from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Card,
    TextField,
    Stack,
    Grid,
    Typography
} from '@mui/material';

import Master from './Master'
import { toast, } from 'react-toastify';
import { successMessage, errorMessage } from '../../utils';
import { useNavigate, useLocation } from "react-router-dom";

import { Lodder } from '../../components/Lodder';
import OtpReceive from '../../components/OtpReceive';


const OtpSend = () => {

    document.title = "APKA DUKAN | REGISTER"
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [form1, setForm1] = useState(true)
    const [form2, setForm2] = useState(false)
    const [form3, setForm3] = useState(false)
    const [mobile,setMobile]=useState(null)
    // console.log(location);
    const formik = useFormik({
       
        initialValues: {
            mobile: '',
        },
        validationSchema: Yup.object({
            mobile: Yup
                .string()
                .required("This field is Required")
                .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    "Phone number is not valid"
                )
                .max(10)
                .min(10)

        }),
        onSubmit: (value, { resetForm, setFieldValue, setValues }) => {
            console.log(setValues, 'd');
            setOpen(true)
            fetch(`/api/otpsend`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    mobile: value.mobile,
                })
            })
                .then(result => {
                    return result.json()
                })
                .then(data => {
                    if (data.error) {
                        setOpen(false)
                        errorMessage(data.error)
                        setFieldValue('mobile', '')
                        setValues(formik.values.mobile, '')
                        console.log(value,'dd');
                        resetForm({
                        })
                        // console.log(data.error)
                    } else {
                        setOpen(false)
                        successMessage('Register Successfully')
                        resetForm({})
                        console.log(value);
                        setForm1(false)
                    }
                })
                .catch(err => { console.log(err) })

        }

    });

    return (
        <Master>
            <Grid
                component="main"
                sx={{
                    display: 'flex',
                    height: '100vh',
                    justifyContent: "center",
                    alignItems: 'center',
                }}
            >
                <Container maxWidth="sm" >
                    {form1?(
                    <Card sx={{ padding: "10px" }} elevation={3}>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ my: 3 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                    sx={{ textAlign: "center" }}
                                >
                                    Register Mobile No
                                </Typography>
                            </Box>
                            <TextField
                                error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                                fullWidth
                                helperText={formik.touched.mobile && formik.errors.mobile}
                                label="Enter Mobile No"
                                margin="normal"
                                name="mobile"
                                max={10}
                                min={10}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.mobile}
                                variant="outlined"
                                type="tel"
                            />
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Register
                                </Button>
                            </Box>
                        </form>
                    </Card>
                    ):(
                        <>
                    {/* =========otp send componet===== */}
                    <OtpReceive/>
                      {/* =========otp send componet===== */}
                      </>
                    )}
                  
                </Container>
            </Grid>
            <>
                <Lodder open={open} />
            </>
        </Master>
    );
};

export default OtpSend;
