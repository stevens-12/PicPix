/**
 * This module defines the User model in MongoDB using Mongoose.
 * @module UserModel
 */

// Import required modules
import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create and export the User model
export default mongoose.model('User', userSchema);