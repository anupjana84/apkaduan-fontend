
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Master from './Master';

const Login = () => {
  document.title ="APKA DUKAN | LOGIN"
    const formik = useFormik({
        initialValues: {
          email: '',
          name: '',
          
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
        onSubmit:(value)=>{
            console.log(value);
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
