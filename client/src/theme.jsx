import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            // main: '#ff6961',
            // main: '#77dd77',
            main: '#03c03c',
        },
        secondary: {
            main: '#FFA700',
        },
        danger: {
            main: '#c23b22'
        },
        gray: {
            main: '#edeef0'
        }
    },
});

export default theme;