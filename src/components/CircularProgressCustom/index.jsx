import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function CircularProgressCustom(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                value={props.value}
                size={100} // Kích thước của vòng tròn
                thickness={5} // Độ dày của vòng tròn
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h6" // Kích thước chữ cho số phần trăm
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default CircularProgressCustom