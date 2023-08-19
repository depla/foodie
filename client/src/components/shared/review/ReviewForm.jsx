import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Rating, Card, CardContent, CardActions } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CardHeader from '@mui/material/CardHeader';
import './ReviewForm.css'

export default function MultilineTextFields() {

    const [rating, setRating] = useState(0);

    return (
        <Card
            className="ReviewFormCard"
            component="form"
            noValidate
            autoComplete="off"
        >
            <CardHeader
                title="Leave a review"
            />
            <CardContent>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <TextField
                    label="Write a review here"
                    multiline
                    rows={8}
                    className='ReviewTextField'
                    color='info'
                />
            </CardContent>
            <CardActions>
                <Button endIcon={<SendIcon />}>
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}