

import React, { useState, useEffect } from 'react'
import Layout from '../Layout'

import { Paper, Box, Button, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import { API } from '../../../utils/api'
import Pagination from '@mui/material/Pagination'
import { css } from '@emotion/react'
import CircleLoader from 'react-spinners/SyncLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;

`;

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
]

function createData(name, code, population, size) {
    const density = population / size
    return { name, code, population, size, density }
}

const AllDistrict = () => {
    document.querySelectorAll(" p * div ")
    document.title ="APKA DUKAN | DISTRICT"
    const [page, setPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(1)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [category, setCategory] = useState([])
    const [lodding, setLodding] = useState(true)
    const [dataLodding, setDataLodding] = useState(false)
    let [color, setColor] = useState("#0ce222");

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    ///get dist list
    const allDist = () => {
        fetch(`/api/admin/getAllDistForAdmin?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
               
                if (result.data && result.data.length > 0) {
                    setLodding(false)
                    setCategory(result.data)
                    setTotalPage(result.totalPage)
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
        allDist()
    }, [page])

    return (
        <Layout>
            {/* ============Button=========== */}
            <Box
                sx={{
                    width: '100%',
                    height: 50,
                    justifyContent: 'space-between',
                    display: 'flex',
                    padding: 0,
                    margin: 0,
                }}
            >
                <Link to="/addDistrict">
                    <Button sx={{ backgroundImage: "linear-gradient(to right, #F09819 0%, #EDDE5D  51%, #F09819  100%)" }} variant="contained">
                        Add District
                    </Button>
                </Link>
                <Button variant="contained">District</Button>
            </Box>
            {/* ============Button=========== */}
            {lodding ? (
                <Box sx={{ display: 'flex', width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}>

                    <Box sx={{
                        display: 'flex', justifyContent: 'center', flexDirection: 'column',
                        alignItems: "center", width: 500, height: 500,
                    }}>
                        <CircleLoader color={color} loading={lodding} css={override} size={25} />
                        <Typography variant="h6" sx={{ color: "#9b06d1" }} component="h2">
                            Please wait.........
                        </Typography>;
                    </Box>
                </Box>

            ) : (
                <>
                    {dataLodding ? (
                        <Box sx={{ width: "100%", height: "100%", justifyContent: 'center' }}>
                            <Typography variant="h6" sx={{ color: "#9b06d1", textAlign: 'center' }} component="h2">
                                No State Found
                            </Typography>
                        </Box>) : (



                        <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" colSpan={3}>
                                                SL. NO
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
                                        {dataLodding ? (
                                            <TableRow sx={{ display: 'flex', justifyContent: "center", width: "100%" }}>


                                            </TableRow>) : (
                                            <>
                                                {category &&
                                                    category.map((item, i) => {
                                                        return (
                                                            <TableRow hover key={i}>
                                                                <TableCell align="left" colSpan={3}>
                                                                    {i + 1}
                                                                </TableCell>
                                                                <TableCell align="left" colSpan={3}>
                                                                    {item.name}
                                                                </TableCell>
                                                                <TableCell a3lign="left">Details</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* ============Table=========== */}
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    count={totalPage}
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    onChange={(event, value) => {
                                        setPage(value)
                                    }}
                                    sx={{ padding: 1 }}
                                />
                            </Box>
                            {/* ============Pagination=========== */}
                        </Paper>
                    )}
                </>)
            }
        </Layout >
    )
}
export default AllDistrict
