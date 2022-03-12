



import React, { useState, useEffect } from "react";
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




import { useNavigate } from "react-router-dom";
import { errorMessage, successMessage } from "../../utils";

const CORRECT_PIN_CODE = "111222";

const OtpReceiveState = ({ mobile, changeForm }) => {

    document.title = "APKA DUKAN | REGISTER"
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [isPinCodeValid, setIsPinCodeValid] = useState(true);
    const [pinCode, setPinCode] = useState("");
    const [mobileNo, setMobile] = useState(null);
    const [btnIsPressed, setBtnIsPressed] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const checkPinCode = () => {
        const isPinCodeValid = pinCode === CORRECT_PIN_CODE;

        setBtnIsPressed(true);
        setIsPinCodeValid(isPinCodeValid);
        if (!isPinCodeValid) setPinCode("");
    };

    const handlePinChange = pinCode => {
        setPinCode(pinCode);
        if (pinCode.length == 4) {
            setDisabled(false)
        }
        setBtnIsPressed(false);
    };

    const sendOtp = (e) => {
        e.preventDefault()
        fetch(`/api/otpReceiveStateAdmin`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',

            },
            body: JSON.stringify({
                mobile: mobile,
                otp: pinCode

            })

        }).then((res) => {
            return res.json()
        }).then(data => {
            //console.log(data);
            if (data.error) {
                setOpen(false)
                errorMessage(data.error)

            } else {
                localStorage.setItem('jwt',JSON.stringify(data))
                successMessage('Register Successfully')
                setPinCode('')
                navigate('/state/dashboard')
                

            }
        }).catch(err => console.log(err))

    }

    useEffect(() => {
        setMobile(mobile)

    }, [])

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
                        onClick={sendOtp}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={disabled}
                    >
                        Send OTP
                    </Button>
                </Box>
            </form>
        </Card>





    );
};

export default OtpReceiveState;
