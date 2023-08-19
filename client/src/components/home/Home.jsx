import { Typography } from "@mui/material"
import { Container } from "@mui/material"
import HomeHeader from "./HomeHeader"
import FoodCardGrid from "../shared/FoodCardGrid"
import { useEffect, useState } from "react"
import axios from "axios";
import './Home.css'

function Home() {
    useEffect(() => {
        fetchRecentActivity();
    }, []);

    const [recentActivityData, setRecentActivityData] = useState([]);

    const fetchRecentActivity = async () => {
        axios.get('api/food').then((response) => {
            setRecentActivityData(response.data);
        });
    }

    return (
        <>
            <HomeHeader />
            <Container component="main" sx={{ mt: 5, mb: 2 }}>
                <Typography className="RecentActivityHeader" gutterBottom>
                    Recent Activity
                </Typography>
            </Container>
            <FoodCardGrid foodCardReviews={recentActivityData} />
        </>
    );
}

export default Home