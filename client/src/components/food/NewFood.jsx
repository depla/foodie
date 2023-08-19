import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DropzoneArea } from "mui-file-dropzone";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { foodSchema } from '../../yupSchemas/foodSchema';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function NewFood() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            food_name: '',
            description: '',
            location: '',
            images: []

        },
        validationSchema: foodSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("food_name", values.food_name);
            formData.append("description", values.description);
            formData.append("location", values.location);
            values.images.forEach(element => {
                formData.append("images", element);
            });

            axios.post('/api/food', formData)
                .then(function (response) {
                    navigate(`/food/${response.data.id}`)
                })
                .catch(function (error) {
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
                        <RestaurantIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New Food
                    </Typography>
                    <Box onSubmit={formik.handleSubmit} encType='multipart/form-data' component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
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
                        />
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => formik.setFieldValue('images', files)}
                            value={formik.values.images}
                            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                            component="input"
                            name="images"
                            type="file"
                            id="images"
                            filesLimit={10}
                        />

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
                    backgroundImage: 'url(https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)',
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