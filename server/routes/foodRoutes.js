const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { validateFoodLocation, validateFood, isFoodAuthor, validateUserFoodImageDelete } = require('../middleware/foodMiddleware');
const { isLoggedIn } = require('../middleware/userMiddleware');

const foodController = require('../controllers/foodController');

router.get('/', foodController.getFoods);
router.post('/', isLoggedIn, upload.array('images'), validateFood, validateFoodLocation, foodController.createFood);

router.get('/:id', foodController.getFood);
router.put('/:id', isLoggedIn, isFoodAuthor, upload.array('images'), validateFood, validateUserFoodImageDelete, validateFoodLocation, foodController.updateFood);
router.delete('/:id', isLoggedIn, isFoodAuthor, foodController.deleteFood)

router.get('/:id/user-images', foodController.getUserFoodImages)
router.put('/:id/user-images', isLoggedIn, upload.array('images'), validateUserFoodImageDelete, foodController.updateUserFoodImages)

module.exports = router;