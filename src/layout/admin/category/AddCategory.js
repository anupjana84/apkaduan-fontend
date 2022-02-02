
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
import { errorMessage,successMessage } from '../../../utils';
import { Link } from 'react-router-dom'
import { API } from '../../../utils/api';
const AddCategory = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup
            .string()
            .max(255)
            .min(3)
            .required(
              'Title is required'),
         
        }),
        onSubmit:(value,{resetForm})=>{
           fetch(`/admin/category/add`,{
               method:"POST",
               headers:{
                  
                   'Content-Type':"application/json"
               },
              
               body:JSON.stringify({title:value.title})
           }).then((res)=>{
               return res.json()
           }).then(data=>{
            if(data.error){
                // setValues({
                //     ...initialValues,
                //     error:data.error,
                //    // success:false
                // })
                errorMessage(data.error)
                resetForm({  
                })
               // console.log(data.error)
              }else{
                successMessage('Add Successfully')
                resetForm({})
            
      
              }
            
           }).catch(err=>console.log(err))
          }
      });
  return(
  <Layout>
     <Box
      sx={{
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        display: 'flex',
       padding:0,
       margin:0
       
      }}
    >
     <Link to="/allCategory">
      <Button  color="success" variant="contained">All Category</Button>
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
      <Container maxWidth="sm" sx={{ border: 1,borderRadius:5, borderColor: 'secondary.main' }}>
       
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
  </Layout>
  )
};

export default AddCategory;
