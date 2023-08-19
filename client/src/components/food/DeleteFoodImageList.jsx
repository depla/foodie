import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import './DeleteFoodImageList.css'

function srcset(image, width, height) {
    return {
        src: `${image}?w=${width}&h=${height}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width}&h=${height
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function DeleteFoodImageList({ foodImages, deleteClicked, imagesToDelete }) {
    return (
        <ImageList
            sx={{
                width: "100%",
                height: 400,
                transform: 'translateZ(0)',
            }}
            rowHeight={300}
            gap={1}
        >
            {foodImages.map((item) => {
                return (
                    <ImageListItem className='DeleteImageThumbnail' key={item.file_name} cols={1} rows={1} onClick={(evt) => deleteClicked(evt, item.file_name, item.user_id)}>
                        <img
                            {...srcset(item.url, 250, 200)}
                            alt="food item"
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            title="Delete?"
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    aria-label="delete button"
                                >
                                    {imagesToDelete.find(element => element.file_name === item.file_name) ? <DeleteIcon sx={{ color: 'red' }} /> : <DeleteOutlineIcon />}
                                </IconButton>
                            }
                            actionPosition="left"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}