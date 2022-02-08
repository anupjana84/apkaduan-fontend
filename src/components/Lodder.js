import React from 'react';


import {

    CircularProgress,
    Backdrop,
    Typography
} from '@mui/material';
export const Lodder = ({ open }) => {
    return <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}

        >
            <Typography>Wait </Typography>
            <CircularProgress color="success" />
        </Backdrop>

    </>;
};
