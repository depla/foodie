import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import FoodInfoPanel from "./FoodInfoPanel";
import Map from "../map/Map";
import ReviewForm from "../review/ReviewForm";
import Review from "../review/Review";
import './FoodDetails.css';

function FoodDetails() {
    const { foodId } = useParams();
    const [foodDetails, setFoodDetails] = useState({});

    useEffect(() => {
        fetchFoodDetails();
    }, []);

    const fetchFoodDetails = async () => {
        axios.get(`/api/food/${foodId}`).then((response) => {
            setFoodDetails(response.data);
        });
    }

    return (
        <>
            <Container className='FoodDetailsContainer' maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <FoodInfoPanel foodInfo={foodDetails} />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Map location={foodDetails.location} latitude={foodDetails.latitude} longitude={foodDetails.longitude} />
                        <ReviewForm />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default FoodDetails