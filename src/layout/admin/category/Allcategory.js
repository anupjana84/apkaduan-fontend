import React,{useState,useEffect} from 'react';
import Layout from '../Layout';

import {Paper,Box,Button} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom'
import { API } from '../../../utils/api';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}



const Allcategory = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [category,setCategory]=useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const allCategory=()=>{
    fetch(`/admin/category/all`,{
      method:"GET",
      headers:{
          'Content-Type':"application/json"
      },
     
  }).then((res)=>{
        return res.json()
    }).then(result=>{
        console.log(result.success);
        setCategory(result.data)
    })
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
    allCategory()
  },[])

  return (
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
     <Link to="/addCategory">
      <Button  color="success" variant="contained">Add Category</Button>
      </Link>
      <Button variant="contained" >
        Home
      </Button>
    
       </Box>

    
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                Index
              </TableCell>
              <TableCell align="left" colSpan={3}>
                  Name
              </TableCell>
              <TableCell align="left" colSpan={3}>
                Action
              </TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody>
            {category && category.map((item,i)=>{
                return(
                    <TableRow hover key={i}  > 
                    <TableCell align="left" colSpan={3} >
                        {i+1}
                    </TableCell>
                    <TableCell align="left"  colSpan={3}>
                        {item.title}
                    </TableCell>
                    <TableCell a3lign="left">
                        Details
                    </TableCell>      
                </TableRow>
                )
            })}
           
              
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
    </Layout>
  );
}
export default Allcategory;