import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Rating, Avatar } from '@mui/material';
import './Review.css'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Review() {
    return (
        <Card className='FoodReviewCard'>
            <CardContent>
                <Typography className='ReviewTitle' variant="h5">
                    insert title here
                </Typography>
                <Avatar className="ReviewAvatar" alt="Reviewer Profile Picture" src="https://media.licdn.com/dms/image/D4D03AQFFYDXNlweAiw/profile-displayphoto-shrink_400_400/0/1690317240225?e=1695859200&v=beta&t=IXLa8vGV17HSoDa_RF_0t149Lim36s_xuOj0B0Xm_J4" />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Submitted by: dennis on 2023-08-05
                </Typography>
                <Rating name="read-only" value={3} readOnly />
                <Typography variant="body2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, excepturi adipisci! Maiores delectus dolorem id ducimus placeat rerum aliquid unde voluptate iste nulla quibusdam voluptates quisquam, suscipit odio veritatis sunt?
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="danger" size="small" endIcon={<DeleteIcon />}>Delete</Button>
            </CardActions>
        </Card >
    );
}