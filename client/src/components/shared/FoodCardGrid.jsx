import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FoodCard from './FoodCard';

function FoodCardGrid({ foodCardReviews }) {
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={0}>
                {foodCardReviews.map((e) => (
                    <Grid xs={12} md={6} lg={4} key={e.id}>
                        <FoodCard foodCardInfo={e} />
                    </Grid>
                ))}
            </Grid>
            {/* <Stack spacing={2}>
                <Pagination count={10} size="large" />
            </Stack> */}
        </Container>
    )
}

export default FoodCardGrid