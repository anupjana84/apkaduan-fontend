import React from 'react'
import DistLayout from './DistLayout'
import {
    Box,
    Button,
    Container,
    Select,
    TextField,
    Typography
} from '@mui/material';

import { Link } from 'react-router-dom'

const DistAdminDashboard = () => {
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
                        <Box
                            component="form"
                            sx={{
                                display: "flex", flexDirection: { xs: 'column', md: 'row' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                label="Age"

                            >

                            </Select>
                            <TextField
                                fullWidth
                                id="outlined-uncontrolled"
                                label="Uncontrolled"
                                defaultValue="foo"
                                sx={{ margin: "5px" }}
                            />
                        </Box>

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

                    </form>

                </Container>
            </Box>

        </DistLayout>
    )
}

export default DistAdminDashboard

