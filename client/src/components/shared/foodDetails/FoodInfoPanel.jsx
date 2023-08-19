import Carousel from 'react-material-ui-carousel';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState, useEffect } from 'react';
import { Rating, Modal, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodInfoPanel.css';

export default function FoodInfoPanel({ foodInfo }) {
    const [userId, setUserId] = useState(-1);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const deletePage = () => {
        axios.delete(`/api/food/${foodInfo.id}`)
            .then((response) => {
                console.log(response);
                setOpen(false);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        axios.get('/api/login').then((response) => {
            setUserId(response.data.user_id);
        })
    }, []);
    return (
        <Card>
            <Carousel autoPlay={false}>
                {
                    foodInfo.food_image?.map((element, i) => {
                        return <img className='FoodDetailsCarouselImage' key={i} src={element.url}></img>
                    })
                }
            </Carousel>
            <CardHeader
                // avatar={
                //     <Avatar aria-label="Reviewer profile picture" src={foodInfo.userAvatar}></Avatar>
                // }
                title={foodInfo.food_name}
                subheader={foodInfo.date_added}
            />
            <CardContent>
                {/* <Rating name="read-only" value={foodInfo.rating || 0} readOnly /> */}
                <Typography variant="body2" color="text.secondary">
                    {foodInfo.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {!userId || (userId == -1) ?
                    <></> :
                    <Button endIcon={<AddAPhotoIcon />} color="info" aria-label="" LinkComponent={Link} to={`/food/${foodInfo.id}/edit/images`} state={{ foodData: foodInfo }}>
                        Upload / Delete
                    </Button>
                }
                {foodInfo.submitted_by === userId ?
                    <>
                        <Button endIcon={<EditIcon />} color="secondary" aria-label="edit food page" LinkComponent={Link} to={`/food/${foodInfo.id}/edit`} state={{ foodData: foodInfo }}>
                            Edit Page
                        </Button>
                        <Button endIcon={<DeleteIcon />} color="danger" aria-label="delete food page" onClick={handleOpen}>
                            Delete Page
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="DeleteFoodModal">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Confirm deletion
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ color: 'red', mt: 2 }}>
                                    Are you sure you want to delete this page?
                                </Typography>
                                <Button className="DeleteModalButton" variant="contained" color="info" onClick={handleClose}>No, I change my mind</Button>
                                <Button className="DeleteModalButton" variant="contained" color="error" onClick={deletePage}>Yes, delete this page</Button>
                            </Box>
                        </Modal>
                    </>
                    : <></>}
            </CardActions>
        </Card>
    );
}