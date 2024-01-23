/**
 * This module handles user authentication and authorization operations.
 * It includes middleware functions to restrict access to certain routes based on user status.
 * @module AuthMiddleware
 */

// Import required modules
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

// Configure environment variables
dotenv.config();


/**
 * Middleware to allow only admin & only public access to certain routes.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next() function to pass to the next middleware.
 */
function onlyAdmin(req, res, next) {
    // Check if the user is authenticated
    const loggedIn = checkCookie(req);
    if (loggedIn) return next();

    // If not authenticated, redirect to home
    return res.redirect("/")
}

function onlyPublic(req, res, next) {
    // Check if the user is authenticated
    const loggedIn = checkCookie(req);
    if (!loggedIn) return next();

    // If authenticated, redirect to gallery
    return res.redirect("/gallery")
}

/**
 * Function to verify if the user is authenticated.
 * @param {Object} req - The HTTP request object.
 * @returns {boolean} Returns true if the user is authenticated, false otherwise.
 */
function checkCookie(req) {
    try {
        // Extract the JWT from the cookie
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        // Decode the JWT
        const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        console.log(decoded)
        // Find the user in the database
        const userToCheck = User.findOne({ user: decoded.user });
        console.log(userToCheck)
        // If the user exists, the user is authenticated
        if (!userToCheck) {
            return false
        }
        return true;
    }
    catch {
        // If there is an error, the user is not authenticated
        return false;
    }
}

// Export the methods to use them as middleware
export const methods = {
    onlyAdmin,
    onlyPublic,
}