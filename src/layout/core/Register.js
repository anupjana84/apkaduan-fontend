
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

import Master from '../core/Master'
import { toast, ToastContainer } from 'react-toastify';
import { successMessage, errorMessage } from '../../utils';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const errorMessage = (error) => {
        if (error) {
            toast.error(`${error}`, {
                position: toast.POSITION.TOP_CENTER,
                progress: undefined,
            }, { autoClose: 3000 })
        }


    }
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            policy: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(25)
                .min(5)
                .required(
                    'Email is required'),
            name: Yup
                .string()
                .max(25)
                .min(5)
                .required(
                    'First name is required '),

            password: Yup
                .string()
                .max(25)
                .min(7)
                .required(
                    'Password is required'),

        }),
        onSubmit: (value, { resetForm }) => {
            console.log(value);
            fetch(`/api/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: value.name,
                    email: value.email,
                    password: value.password
                })
            })
                .then(result => {
                    return result.json()
                })
                .then(data => {
                    //console.log(data)
                    //   console.log(JSON.stringify(data.user))
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
                        successMessage('Register Successfully')
                        resetForm({})
                        navigate('/login')

                    }

                    // else{
                    //   localStorage.setItem('jwt',JSON.stringify(data))
                    //     setValues({
                    //         ...values,
                    //         error:false,
                    //         didRedirect:true,
                    //         success:true
                    //     })
                    // }
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
                <Container maxWidth="sm" sx={{ alignSelf: 'center' }}>
                    <Card sx={{ padding: "10px" }} elevation={3}>
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{ my: 3 }}>
                                <Typography
                                    color="textPrimary"
                                    variant="h4"
                                    sx={{ textAlign: "center" }}
                                >
                                    Create a new account
                                </Typography>

                            </Box>
                            <TextField
                                error={Boolean(formik.touched.name && formik.errors.name)}
                                fullWidth
                                helperText={formik.touched.name && formik.errors.name}
                                label="Enter Name"
                                margin="normal"
                                name="name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                variant="outlined"
                            />

                            <TextField
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                fullWidth
                                helperText={formik.touched.email && formik.errors.email}
                                label="Email Address"
                                margin="normal"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.email}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                                margin="normal"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    ml: -1
                                }}
                            >
                                <Checkbox
                                    checked={formik.values.policy}
                                    name="policy"
                                    onChange={formik.handleChange}
                                />
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    I have read the
                                    {' '}

                                </Typography>
                            </Box>
                            {Boolean(formik.touched.policy && formik.errors.policy) && (
                                <FormHelperText error>
                                    {formik.errors.policy}
                                </FormHelperText>
                            )}
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign Up Now
                                </Button>
                            </Box>

                        </form>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: "center", marginTop: '1.0rem', flexDirection: { xs: 'column', md: 'row' }, }}>
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}>
                                <Button variant="contained" >State Seller</Button>
                                <Button variant="contained" sx={{ mt: { xs: '10px', md: '' } }}>District Seller</Button>
                                <Button variant="contained" sx={{ mt: { xs: '10px', md: '' } }}>Seller</Button>
                            </Stack>
                        </Box>
                    </Card>
                </Container>
            </Grid>

        </Master>
    );
};

export default Register;
