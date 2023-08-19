import * as yup from 'yup';

export const foodSchema = yup.object({
    food_name: yup
        .string('Enter food item name')
        .required('Food item name is required')
        .max(100, '100 character limit reached'),
    description: yup
        .string('Enter description')
        .required('Description is required')
        .max(65535, '65535 character limit reached'),
    location: yup
        .string('Enter food location')
        .max(150, '150 character limit reached')
        .required('Location is required'),
});