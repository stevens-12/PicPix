/**
 * This module handles user authentication operations.
 * @module auth
 */

// Import required modules
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

// Load environment variables
dotenv.config();

/**
 * Function to log in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the user has been authenticated successfully.
 */

async function login(req, res) {
  // Extract user credentials from the request body
  // console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;

  // Check if user and password are provided
  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Incomplete fields" })
  }

  // Find the user in the database
  const userToCheck = await User.findOne({ user });
  if (!userToCheck) {
    return res.status(400).send({ status: "Error", message: "Login error" })
  }

  // Compare the provided password with the stored password
  const correctLogin = await bcryptjs.compare(password, userToCheck.password);
  if (!correctLogin) {
    return res.status(400).send({ status: "Error", message: "Login error" })
  }

  // Generate a JSON Web Token (JWT)
  const token = jsonwebtoken.sign(
    { user: userToCheck.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION });

  // Set cookie options
  const cookieOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    path: "/"
  }

  // Set the JWT as a cookie
  res.cookie("jwt", token, cookieOption);

  // Send a success response
  res.send({ status: "ok", message: "User logged in", redirect: "/gallery" });
}


/**
 * Function to register a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the user has been registered successfully.
 */
async function register(req, res) {
  // Extract user credentials from the request body
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;

  // Check if user, password, and email are provided
  if (!user || !password || !email) {
    return res.status(400).send({ status: "Error", message: "Incomplete fields" })
  }

  // Check if the user already exists in the database
  const userToCheck = await User.findOne({ user });
  if (userToCheck) {
    return res.status(400).send({ status: "Error", message: "This user already exists" })
  }

  // Generate a salt for the password
  const salt = await bcryptjs.genSalt(5);

  // Hash the password
  const hashPassword = await bcryptjs.hash(password, salt);

  // Create a new user object
  const newUserData = {
    user, email, password: hashPassword
  }

  // Create a new user instance
  const newUser = new User(newUserData);

  // Save the new user to the database
  await newUser.save();
  // console.log(newUser);

  // Send a success response
  return res.status(201).send({ status: "ok", message: `User ${newUserData.user}  has been added` })
}

// Export the methods
export const methods = {
  login,
  register
}