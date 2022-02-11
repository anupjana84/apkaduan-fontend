import React,{useState} from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    
    Container,
  
    Card,
    TextField,
 
    Grid,
    Typography
} from '@mui/material';

import Master from './Master'

import {  errorMessage } from '../../utils';
import { useNavigate,  } from "react-router-dom";

import { Lodder } from '../../components/Lodder';
import OtpReceive from '../../components/OtpReceive';


const OtpSend = () => {

    document.title = "APKA DUKAN | REGISTER"
    const navigate = useNavigate();
    // const location = useLocation();
    const [mobile, setMobile] = useState(null);
    const [open, setOpen] = useState(false);
    const [form1, setForm1] = useState(true)
  
   
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
                   console.log(data)
                    if (data.error) {
                        setOpen(false)
                        errorMessage(data.error)
                       // setFieldValue('mobile', '')
                        setValues(formik.values.mobile, '')
                        //console.log(value,'dd');
                        resetForm({
                        })
                        // console.log(data.error)
                    } else {
                        //console.log(data);
                        setMobile(data.mobile)
                        setOpen(false)
                        
                        resetForm({})
                        //console.log(value);
                        setForm1(false)
                    }
                })
                .catch(err => { console.log(err) })

        }

    });
    const changeForm=()=>{

    }

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
                    <OtpReceive mobile={mobile} changeForm={changeForm}  />
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
