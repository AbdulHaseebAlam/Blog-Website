const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, min: 3 },
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                // Regular expression for validating email addresses
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
        },
        message: props => `${props.value} is not a valid email address!`
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Minimum length of password
        validate: {
            validator: function (value) {
                // Regular expression for validating password strength (minimum 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character)
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\\-={}[\]:;"'<>,.?/]).{8,}$/.test(value);
            },
            message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!`
        }
    },
})
const User = mongoose.model('User', userSchema);

module.exports = User;