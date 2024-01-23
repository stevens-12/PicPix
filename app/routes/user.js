/**
 * Routes Module: Manages user CRUD operations.
 * @module routes/userRoutes
 */


//Import necessary modules and functions.
import express from "express";
import User from "../models/user.js";
import { methods as authMethods } from "../controllers/authentication.controller.js";

/**
 * Create an Express router.
 * @constant {Object} router
 */
const router = express.Router();

/**
 * Authentication routes
 * Destructure register and login methods from authMethods.
 * @constant {Function} registerUser
 * @constant {Function} loginUser
 */
const { register: registerUser, login: loginUser } = authMethods;
router.post("/register", registerUser);
router.post("/login", loginUser);

/**
 * Create a new user
 * Params: req.body should contain user data
 * Returns: Newly created user object
 * @route POST /users
 */
router.post("/users", async (req, res) => {
    const { user, email, password } = req.body;
    const newUser = new User(req.body);

    try {
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Retrieve all users
 * Returns: Array of user objects
 * @route GET /users
 */
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Retrieve a specific user by ID
 * Params: req.params.id should contain the user ID
 * Returns: Requested user object
 * @route GET /users/:id
 */
router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Delete a specific user by ID
 * Params: req.params.id should contain the user ID
 * Returns: Message confirming deletion
 * @route DELETE /users/:id
 */
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Update a specific user by ID
 * Params: req.params.id should contain the user ID, req.body should contain updated user data
 * Returns: Updated user object
 * @route PUT /users/:id
 */
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const result = await User.updateOne(
            { _id: id },
            { $set: { name, email } }
        );
        if (result.matchedCount === 0)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Export the router.
 * @exports router
 */
export default router;