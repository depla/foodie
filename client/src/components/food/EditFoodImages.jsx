import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DropzoneArea } from "mui-file-dropzone";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { foodSchema } from '../../yupSchemas/foodSchema';
import axios from "axios";
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DeleteFoodImageList from './DeleteFoodImageList';
import { useState, useEffect } from 'react';
import './EditFoodImages.css'

export default function EditFoodImages() {
    const { id } = useParams();
    // const { state } = useLocation();

    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [foodImages, setFoodImages] = useState([]);

    useEffect(() => {
        axios.get(`/api/food/${id}/user-images`).then((response) => {
            setFoodImages(response.data);
        })
    }, [])

    function deleteClicked(evt, fileName, userId) {
        if (imagesToDelete.find(element => element.file_name === fileName)) {
            const newList = imagesToDelete.filter((element) => (!(element.file_name === fileName)));
            setImagesToDelete(newList)
        }
        else {
            setImagesToDelete([...imagesToDelete, { file_name: fileName, user_id: userId }]);
        }
    }

    // let foodData = null;

    // if (state) {
    //     foodData = state.foodData;
    // }

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            images: [],
        },
        onSubmit: (values) => {
            const formData = new FormData();
            values.images.forEach(element => {
                formData.append("images", element);
            });
            imagesToDelete.forEach((element, idx) => {
                formData.append(`images_delete[${idx}]`, JSON.stringify(element));
            });

            axios.put(`/api/food/${id}/user-images`, formData)
                .then(function (response) {
                    navigate(`/food/${id}`)
                })
                .catch(function (error) {
                    console.log(error)
                    toast.dismiss();
                    toast.error(error.response.data, {
                        duration: 3000,
                        position: 'top-center'
                    });
                });;
        },
    });
    return (
        <Grid container component="main">
            <Toaster />
            <CssBaseline />
            <Grid item xs={12} sm={9} md={8} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 3,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PhotoCameraIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Food Images
                    </Typography>
                    <Box onSubmit={formik.handleSubmit} encType='multipart/form-data' component="form" noValidate sx={{ mt: 1 }}>
                        {/* <TextField
                            color="info"
                            margin="normal"
                            required
                            fullWidth
                            id="food_name"
                            label="Food Name"
                            name="food_name"
                            value={formik.values.food_name}
                            onChange={formik.handleChange}
                            error={formik.touched.food_name && Boolean(formik.errors.food_name)}
                            helperText={formik.touched.food_name && formik.errors.food_name}
                            autoFocus
                        />
                        <TextField
                            color="info"
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            label="Food Location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                        <TextField
                            color="info"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            id="description"
                            multiline
                            rows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        /> */}
                        <div className='DropzoneArea'>
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Add more images here"}
                                onChange={(files) => formik.setFieldValue('images', files)}
                                value={formik.values.images}
                                onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                                component="input"
                                name="images"
                                type="file"
                                id="images"
                                filesLimit={10}
                            />
                        </div>
                        {foodImages.length > 0 ? <DeleteFoodImageList foodImages={foodImages} deleteClicked={deleteClicked} imagesToDelete={imagesToDelete} /> : <></>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={3}
                md={4}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1639131285716-3fc7f624f138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}