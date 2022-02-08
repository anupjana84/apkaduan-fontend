
import React, { useState } from "react";
import ReactCodeInput from "react-code-input";

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


import { toast, } from 'react-toastify';
import { successMessage, errorMessage } from '../utils';
import { useNavigate } from "react-router-dom";

const CORRECT_PIN_CODE = "111222";

const OtpReceive = () => {

    document.title = "APKA DUKAN | REGISTER"
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [isPinCodeValid, setIsPinCodeValid] = useState(true);
    const [pinCode, setPinCode] = useState("");
    const [btnIsPressed, setBtnIsPressed] = useState(false);

    const checkPinCode = () => {
        const isPinCodeValid = pinCode === CORRECT_PIN_CODE;

        setBtnIsPressed(true);
        setIsPinCodeValid(isPinCodeValid);
        if (!isPinCodeValid) setPinCode("");
    };

    const handlePinChange = pinCode => {
        setPinCode(pinCode);
        setBtnIsPressed(false);
    };




    return (



        <Card sx={{ padding: "10px" }} elevation={3}>

            <form >
                <Box sx={{ my: 3 }}>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                        sx={{ textAlign: "center" }}
                    >
                        Enter Your OTP
                    </Typography>

                </Box>
                <>
                    <Box sx={{ my: 3, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <ReactCodeInput
                            id="pinCode"
                            type="text"
                            isValid={isPinCodeValid}
                            fields={4}
                            onChange={handlePinChange}
                            value={pinCode}
                        />



                    </Box>
                </>


                <Box sx={{ py: 2 }}>
                    <Button
                        color="primary"
                        onClick={checkPinCode}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Send OTP
                    </Button>
                </Box>
            </form>
        </Card>





    );
};

export default OtpReceive;
