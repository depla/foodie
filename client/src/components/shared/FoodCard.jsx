import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { Link } from '@mui/material';

export default function FoodCard({ foodCardInfo }) {
    return (
        <Card sx={{ maxWidth: '100%', maxHeight: 300, margin: '1em' }}>
            <CardActionArea href={`/food/${foodCardInfo.id}`} component={Link} >
                <CardMedia
                    component="img"
                    height="150"
                    image={foodCardInfo.food_image.length > 0 ? foodCardInfo.food_image[0].url : "https://placehold.co/300?text=No+Photos+Yet!&font=roboto"}
                    alt="food"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {foodCardInfo.food_name}
                    </Typography>
                    {/* <Avatar alt="User Profile Picture" src={foodCardInfo.userAvatar} /> */}
                    {/* <Typography variant="body2" color="text.secondary">
                        Reviewed by: {foodCardInfo.username}
                    </Typography> */}
                    {/* <Rating name="read-only" value={foodCardInfo.rating} readOnly /> */}

                </CardContent>
            </CardActionArea>
        </Card>
    );
}