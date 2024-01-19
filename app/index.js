// Import required modules
import express from "express";
import cookieParser from 'cookie-parser';

//Fix para __direname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js"
import { methods as authorization } from "./middlewares/authorization.js";


//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Server running on port", app.get("port"));

//Configuration
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cookieParser())


//Routes
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/home.html"));
app.get("/gallery", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/gallery.html"));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);