import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const getLogin = async () => {
    const res = await axios.get('/api/login');
    return res;
}

function ProtectedRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        getLogin().then((res) => {
            setIsLoggedIn(res.data.isLoggedIn);
        });
    }, []);

    const loggedInQuery = useQuery("loggedIn", getLogin);

    if (loggedInQuery.isLoading) {
        return <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    return (!loggedInQuery.isLoading && isLoggedIn) ? <Outlet /> : <Navigate to='/login' state={{ showToast: true }} />;
}

export default ProtectedRoutes;
