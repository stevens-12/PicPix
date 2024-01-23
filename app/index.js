/**
 * Main Application Module: Handles server initialization, middleware configuration, route definitions, and database connection.
 * @module mainApp
 */

// Import required modules
import express from "express";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

// Import authentication and authorization methods
import { methods as authentication } from "./controllers/authentication.controller.js"
import { methods as authorization } from "./middlewares/authorization.js";

// Load environment variables from .env file
dotenv.config();


//Fix para __direname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


//Initialize server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Server running on port", app.get("port"));

// Configure middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cookieParser())
app.use(express.json());
app.use("/api", userRoute);

// Define routes
app.get("/", authorization.onlyPublic, (req, res) => res.sendFile(__dirname + "/pages/home.html"));
app.get("/gallery", authorization.onlyAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/gallery.html"));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

// Connect to MongoDB
const uri = process.env.MONGODB_URI;

let _db;

async function connect() {
    if (_db) {
        return _db;
    }

    try {
        const db = await mongoose.connect(uri);

        console.log('Connected to MongoDB');

        // Listen for connection errors
        mongoose.connection.on('error', err => {
            console.error('Error connecting to MongoDB:', err);
        });

        // Listen to the disconnect
        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });

        _db = db;
        return _db;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connect();

// Export connect function
export default connect;