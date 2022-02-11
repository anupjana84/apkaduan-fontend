import React, { useState, useEffect } from 'react'
import DistLayout from './DistLayout'
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
    Autocomplete
} from '@mui/material';

import { Link } from 'react-router-dom'
import Cleave from 'cleave.js/react';


const options = ['Option 1', 'Option 2'];
const DistAdminDashboard = () => {
    // document.querySelectorAll(" p * div ")
    const [stateName, setStateName] = useState([])
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const getState = () => {
        fetch(`/api/admin/getState`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                console.log(result.data);
                if (result.data && result.data.length > 0) {

                    setStateName(result.data)

                }

            })
            .catch((err) => console.log(err))
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
                <Link to="/">
                    <Button sx={{ backgroundImage: "linear-gradient(to right, #f857a6 0%, #ff5858  51%, #f857a6  100%)" }} variant="contained">ADD Details</Button>
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
                    <form >
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
                                fullWidth
                                label=" Enter Name"
                                margin="normal"
                                name="name"
                                type="text"
                                variant="outlined"
                                sx={{ marginRight: "5px" }}
                            />
                            <TextField
                                fullWidth
                                label=" Enter Email"
                                margin="normal"
                                name="email"
                                type="text"
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
                                type="number"
                                fullWidth
                                label=" Enter aadhar"
                                margin="normal"
                                name="aadhar"

                                variant="outlined"
                                sx={{ marginRight: "5px" }}
                            />
                            <TextField
                                fullWidth
                                label=" Enter Pan"
                                margin="normal"
                                name="title"
                                type="text"
                                variant="outlined"

                            />
                        </Box>
                        {/* =================aadhar pan======== */}
                        {/* =============== state dist */}
                        <Box
                            sx={{
                                display: "flex", flexDirection: { xs: 'column', md: 'row' }
                            }}
                            noValidate
                            autoComplete="off"
                        >


                            <Autocomplete

                                onChange={(event, newValue) => {
                                    console.log(event, newValue)
                                    setValue(newValue);
                                }}
                                getOptionLabel={(option) => option.name}
                                options={stateName}
                                fullWidth
                                sx={{ marginRight: "5px" }}
                                renderInput={(params) => <TextField fullWidth {...params} label="State Name" />}
                            />
                            <TextField
                                fullWidth
                                id="outlined-uncontrolled"
                                label="Uncontrolled"

                                sx={{ marginLeft: { sm: "0px", md: "5px" }, marginTop: { sm: "7px", md: "0px" } }}

                            />

                        </Box>
                        {/* =============== state dist */}
                        <TextField
                            fullWidth
                            label=" Enter Title"
                            margin="normal"
                            name="title"
                            type="text"
                            variant="outlined"
                        />
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

                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Add Category
                            </Button>
                        </Box>
                        <Cleave placeholder="Enter your credit card number"
                            options={{ creditCard: true }}
                            onChange={(e) => console.log(e)} />
                    </form>

                </Container>
            </Box>

        </DistLayout>
    )
}

export default DistAdminDashboard

