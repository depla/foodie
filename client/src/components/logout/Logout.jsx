import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        axios.post('/api/logout');
        navigate('/');
    }, []);

    return (
        <></>
    )
}

export default Logout