import * as yup from 'yup';

export const userSignUpSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});