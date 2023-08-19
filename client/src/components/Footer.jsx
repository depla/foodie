import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="./">
                Foodie
            </Link>{' '}
            {2023}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    width: '100%',
                    bottom: 0,
                    position: 'sticky',
                    backgroundColor: (theme) => theme.palette.secondary.main
                }}
            >
                <Container maxWidth="lg">
                    <Copyright />
                </Container>
            </Box>
        </Box>
    );
}