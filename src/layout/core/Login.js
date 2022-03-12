
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';

import Master from './Master';
import { errorMessage, successMessage } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()
  document.title ="APKA DUKAN | LOGIN"
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          
        },
        validationSchema: Yup.object({
          email: Yup
            .string()
            .email(
              'Must be a valid email')
            .max(255)
            .required(
              'Email is required'),
        
          
          password: Yup
            .string()
            .max(255)
            .required(
              'Password is required'),
         
        }),
        onSubmit:(value, { resetForm })=>{
          fetch(`/api/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                email: value.email,
                password: value.password
            })
        })
            .then(res => {
                return res.json()
            })
            .then(result => {
              console.log(result);
                if (result.error) {
                    errorMessage(result.error)
                
                } else {

                    successMessage('Register Successfully')
                     localStorage.setItem('jwt',JSON.stringify(result.data))
                    if (result.data.user.role=='admin') {
                       navigate('/admin/dashboard')
                    }
                    if (result.data.user.role=='distadmin') {
                       navigate('/dist/AdminDashboard')
                    }
                      
                    resetForm({})
                }

               
            })
            .catch(err => { console.log(err) })
          }
      });
  return(<Master>
     
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="sm">
       
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Login
            </Typography>
           
          </Box>
         
         
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
          
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              //disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Login Now
            </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body2"
          >
           Create an account?
            {' '}
           
          </Typography>
        </form>
      </Container>
    </Box>
  </Master>
  )
};

export default Login;
